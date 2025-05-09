import typing as t
import datetime

from sqlalchemy import (
    Column,
    String,
    Float,
    BigInteger,
    DateTime,
    Text,
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.models.core.base import BaseOrm


class MessageOrm(BaseOrm):
    __tablename__ = "messages"

    chat_id = Column(BigInteger, ForeignKey("chats.chat_id"), index=True)
    message_id = Column(BigInteger, nullable=False)
    message_content = Column(Text, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)
    message_type = Column(String, nullable=False)
    media = Column(Text, nullable=True)

    chat = relationship("ChatOrm", back_populates="messages")


    