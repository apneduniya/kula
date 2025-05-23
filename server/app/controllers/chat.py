import typing as t
import uuid

from fastapi import APIRouter, HTTPException, Query, Depends
from fastapi.responses import StreamingResponse
from fastapi_restful.cbv import cbv

from agno.storage.postgres import PostgresStorage
from agno.workflow import RunResponse

from app.config.settings import config
from app.core.logging import logger
from app.services.chat import ChatService
from app.services.messages import MessageService
from app.agent.workflows.chat import ChatWorkflow
from app.models.llm import LLMResponse
from app.schemas.core.base import BackendAPIResponse
from app.schemas.chat import RequestCreateNewChat, ResponseCreateNewChat
from app.schemas.message import RequestSendMessage, ResponseSendMessage
from app.schemas.repository.message import MessageSchema
from app.schemas.repository.chat import ChatSchema, ChatSchemaWithoutMessages


chat_router = APIRouter(prefix="/chat", tags=["Chat"])


@cbv(chat_router)
class ChatController:
    def __init__(self):
        self.chat_service = ChatService()
        self.message_service = MessageService()
        self.chat_storage = PostgresStorage(
            table_name="agent_chat",
            db_url=config.DATABASE_URL
        )

    @chat_router.post("/new")
    async def create_new_chat(self, request: RequestCreateNewChat) -> BackendAPIResponse[ResponseCreateNewChat]:
        """
        Create a new chat message in the database and in return, get the chat ID.
        """
        chat_schema = ChatSchema(user_id=request.user_id, title=request.title)

        result = await self.chat_service.create_new_chat(chat_schema)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Chat created successfully",
                data=ResponseCreateNewChat(chat_id=result.id)
            )
        else:
            logger.error(f"Failed to create chat for user_id: {request.user_id}")
            raise HTTPException(status_code=400, detail="Failed to create chat")
    
    @chat_router.get("/{chat_id}")
    async def get_chat_by_id(self, chat_id: uuid.UUID) -> BackendAPIResponse[ChatSchemaWithoutMessages]:
        """
        Get a chat by ID and in return, get the list of messages.
        """
        result = await self.chat_service.get_chat_by_id_without_messages(chat_id)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Chat fetched successfully",
                data=result
            )
        else:
            logger.error(f"Chat not found for chat_id: {chat_id}")
            raise HTTPException(status_code=404, detail="Chat not found")
   
    @chat_router.get("/user/{user_id}")
    async def get_chats_by_user_id(self, user_id: int) -> BackendAPIResponse[t.List[ChatSchemaWithoutMessages]]:
        """
        Get all chats by user ID (without messages).
        """
        result = await self.chat_service.get_chats_by_user_id(user_id)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Chats fetched successfully",
                data=result
            )
        else:
            logger.error(f"Chats not found for user_id: {user_id}")
            raise HTTPException(status_code=404, detail="Chats not found")
