import typing as t
import uuid

from app.core.logging import logger
from app.services.chat import ChatService
from app.static.llm import OpenAIModel
from app.static.prompts.general_user_chat import SYSTEM_PROMPT
from app.services.core.llm import LLM
from app.models.llm import LLMResponse
from app.utils.llm_user_message_list import get_llm_user_message_list


class ChatAgentService:
    """
    Service class for handling chat-related operations in the application.
    """
    def __init__(self):
        """Initialize the ChatAgentService with a ChatAgentRepository instance."""
        self.chat_service: ChatService = ChatService()
        self.llm = LLM(OpenAIModel.GPT_4O)

    async def general_agent(self):
        ...

    async def general_agent_response(self, chat_id: uuid.UUID) -> LLMResponse:
        """
        Generate a response from the general agent for the given chat and saves it's response in the database.

        Args:
            chat_id: The ID of the chat to generate a response for.

        Returns:
            A list of messages.
        """
        chat = await self.chat_service.get_chat_by_id(chat_id)
        if not chat:
            logger.error(f"Chat not found for chat_id: {chat_id}")
            raise ValueError("Chat not found")
        
        system_message = {"role": "system", "content": SYSTEM_PROMPT}
        messages: t.List[t.Dict[str, t.Any]] = get_llm_user_message_list(chat)
        if not messages:
            logger.error(f"No messages found for chat_id: {chat_id}")
            raise ValueError("No messages found")
        
        messages.insert(0, system_message)
        
        response = await self.llm.chat_completion(messages)
        if not response.content:
            logger.error(f"No response from the LLM for chat_id: {chat_id}")
            raise ValueError("No response from the LLM")
        
        return response




