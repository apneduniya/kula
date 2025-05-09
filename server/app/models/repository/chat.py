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


class ChatOrm(BaseOrm):
    __tablename__ = "chats"

    chat_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)

    messages = relationship("MessageOrm", back_populates="chat")


    