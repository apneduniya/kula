import typing as t

from datetime import datetime
from app.models.repository.chat import ChatOrm
from app.schemas.core.base import BaseSchema
from app.schemas.repository.message import MessageSchema


class ChatSchema(BaseSchema):
    __orm__ = ChatOrm

    title: str
    user_id: int
    
    messages: t.List[MessageSchema | None] = []