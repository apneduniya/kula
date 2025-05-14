import typing as t
import datetime

from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime,
    Text,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from app.models.core.base import BaseOrm


class MessageOrm(BaseOrm):
    __tablename__ = "messages"

    chat_id = Column(UUID(as_uuid=True), ForeignKey("chats.id"), index=True)
    content = Column(Text, nullable=False)
    type = Column(String, nullable=False)
    is_from_user = Column(Boolean, nullable=False)
    media = Column(Text, nullable=True)

    chat = relationship("ChatOrm", back_populates="messages")


    