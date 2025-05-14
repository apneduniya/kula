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

    title = Column(String, nullable=False)
    user_id = Column(BigInteger, nullable=False, index=True)

    messages = relationship("MessageOrm", back_populates="chat")


    