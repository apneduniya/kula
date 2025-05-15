import typing as t
import asyncio

from app.schemas.core.pageable import PageRequestSchema, PageResponseSchema
from app.schemas.repository.chat import ChatSchema
from app.repositories.chat import ChatRepository
from app.schemas.repository.message import MessageSchema


class ChatService:
    """
    Service class for handling chat-related operations in the application.

    This service provides a comprehensive set of methods for managing chat messages,
    including CRUD operations and paginated retrieval of chat history. It acts as an
    intermediary between the application's controllers and the data layer.

    The service supports:
    - Saving new chat messages
    - Retrieving messages by ID, user ID, or chat ID
    - Updating existing messages
    - Deleting messages
    - Paginated retrieval of chat history by username, chat ID, or all chats

    Attributes:
        chat_repo (ChatRepository): Repository instance for database operations
    """
    def __init__(self):
        """Initialize the ChatService with a ChatRepository instance."""
        self.chat_repository: ChatRepository = ChatRepository()

    async def create_new_chat(self, chat: ChatSchema) -> ChatSchema:
        """
        Create a new chat message in the database.

        Args:
            chat (ChatSchema): The chat message to be created.
        
        Returns:
            ChatSchema: The created chat message.
        """
        chat_orm = chat.to_orm()
        result = await self.chat_repository.save(chat_orm)
        return ChatSchema.model_validate(result)
    
    async def get_chat_by_id(self, chat_id: int) -> t.Optional[ChatSchema]:
        """
        Get a chat by ID.
        """
        result = await self.chat_repository.get_chat_by_id(chat_id)
        return ChatSchema.model_validate(result) if result else None
    
    async def get_chats_by_user_id(self, user_id: int) -> t.List[ChatSchema]:
        """
        Get a chat by user ID.
        """
        result = await self.chat_repository.get_chats_by_user_id(user_id)
        return [ChatSchema.model_validate(chat) for chat in result]
    
    async def get_messages_by_chat_id(self, chat_id: int) -> t.List[MessageSchema]:
        """
        Get all messages by chat ID.
        """
        result = await self.chat_repository.get_messages_by_chat_id(chat_id)
        return [MessageSchema.model_validate(message) for message in result]
    

