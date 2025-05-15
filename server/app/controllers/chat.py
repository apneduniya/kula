import typing as t
import uuid
from fastapi import APIRouter, HTTPException, Query, Depends
from fastapi_restful.cbv import cbv

from app.core.logging import logger

from app.services.chat import ChatService
from app.services.messages import MessageService

from app.schemas.core.base import BackendAPIResponse
from app.schemas.chat import RequestCreateNewChat, ResponseCreateNewChat
from app.schemas.message import RequestSendMessage, ResponseSendMessage
from app.schemas.repository.message import MessageSchema
from app.schemas.repository.chat import ChatSchema


chat_router = APIRouter()


@cbv(chat_router)
class ChatController:
    def __init__(self):
        self.chat_service = ChatService()
        self.message_service = MessageService()

    @chat_router.post("/new")
    async def create_new_chat(self, request: RequestCreateNewChat) -> BackendAPIResponse[ResponseCreateNewChat]:
        """
        Create a new chat message in the database.
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
            raise HTTPException(status_code=400, detail="Failed to create chat")
    
    @chat_router.get("/{chat_id}")
    async def get_chat_by_id(self, chat_id: uuid.UUID) -> BackendAPIResponse[ChatSchema]:
        """
        Get a chat by ID.
        """
        result = await self.chat_service.get_chat_by_id(chat_id)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Chat fetched successfully",
                data=result
            )
        else:
            raise HTTPException(status_code=404, detail="Chat not found")
        
    @chat_router.get("/{chat_id}/messages")
    async def get_messages_by_chat_id(self, chat_id: uuid.UUID) -> BackendAPIResponse[t.List[MessageSchema]]:
        """
        Get all messages by chat ID.
        """
        result = await self.chat_service.get_messages_by_chat_id(chat_id)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Messages fetched successfully",
                data=result
            )
        else:
            raise HTTPException(status_code=404, detail="Messages not found")
        

    @chat_router.post("/{chat_id}/send-message")
    async def send_message(self, chat_id: uuid.UUID, request: RequestSendMessage) -> BackendAPIResponse[ResponseSendMessage]:
        """
        Send a message to a chat.
        """
        message_schema = MessageSchema(
            chat_id=chat_id,
            content=request.content,
            type="text", # TODO: in later version, we will add type of the message - user can send text, image, audio, video, etc.
            media=None, # TODO: in later version, we will add media - user can send media in url format
            is_from_user=True
        )

        result = await self.message_service.send_message(message_schema)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Message sent successfully",
                data=ResponseSendMessage(messages=[result])
            )
        else:
            raise HTTPException(status_code=400, detail="Failed to send message")
    
    @chat_router.get("/user/{user_id}")
    async def get_chats_by_user_id(self, user_id: int) -> BackendAPIResponse[t.List[ChatSchema]]:
        """
        Get all chats by user ID.
        """
        result = await self.chat_service.get_chats_by_user_id(user_id)
        if result:
            return BackendAPIResponse(
                success=True,
                message="Chats fetched successfully",
                data=result
            )
        else:
            raise HTTPException(status_code=404, detail="Chats not found")
