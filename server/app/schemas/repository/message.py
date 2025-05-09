import typing as t

from datetime import datetime
from app.models.repository.message import MessageOrm
from app.schemas.core.base import BaseSchema


class MessageSchema(BaseSchema):
    __orm__ = MessageOrm

    chat_id: int
    message_id: int
    message_content: str
    timestamp: datetime
    message_type: str
    media: t.Optional[str] = None