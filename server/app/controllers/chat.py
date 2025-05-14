import typing as t
import uuid
from fastapi import APIRouter, HTTPException, Query, Depends
from fastapi_restful.cbv import cbv

from app.core.logging import logger
from app.services.chat import ChatService
from app.schemas.core.base import BackendAPIResponse
from app.schemas.repository.chat import ChatSchema
from app.schemas.chat import RequestCreateNewChat, ResponseCreateNewChat


chat_router = APIRouter()


@cbv(chat_router)
class ChatController:
    def __init__(self):
        self.chat_service = ChatService()

    @chat_router.post("/new")
    async def create_new_chat(self, request: RequestCreateNewChat) -> BackendAPIResponse[ResponseCreateNewChat]:
        """
        Create a new chat message in the database.
        """
        chat_schema = ChatSchema(user_id=request.user_id, title=request.title)

        result = await self.chat_service.create_new_chat(chat_schema)
        return BackendAPIResponse(
            success=True,
            message="Chat created successfully",
            data=ResponseCreateNewChat(chat_id=result.id)
        )
    
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
    
    
    @chat_router.get("/user/{user_id}")
    async def get_chats_by_user_id(self, user_id: int) -> BackendAPIResponse[t.List[ChatSchema]]:
        """
        Get all chats by user ID.
        """
        result = await self.chat_service.get_chats_by_user_id(user_id)
        return BackendAPIResponse(
            success=True,
            message="Chats fetched successfully",
            data=result
        )
