import typing as t

from datetime import datetime
from app.models.repository.chat import ChatOrm
from app.schemas.core.base import BaseSchema
from server.app.schemas.repository.message import MessageSchema


class ChatSchema(BaseSchema):
    __orm__ = ChatOrm

    chat_id: int
    user_id: int
    chat_type: str
    timestamp: datetime
    messages: t.List[MessageSchema | None] = []