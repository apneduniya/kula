import typing as t

from sqlalchemy import or_, select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import joinedload
from app.repository.core.repository import GenericRepository
from app.repository.core.session import get_db_session
from app.schemas.core.pageable import PageRequestSchema

from app.models.repository.chat import ChatOrm
from app.models.repository.message import MessageOrm


class ChatRepository(GenericRepository[ChatOrm]):
    """
    Repository class for managing chat-related database operations.
    
    This repository provides methods to interact with chat data in the database,
    including retrieving chats by various identifiers and paginated queries.
    
    Use Cases:
    - Managing user chat history and interactions
    - Implementing chat-based features
    """
    def __init__(self):
        super().__init__(ChatOrm)
    
    async def get_messages_by_chat_id(self, chat_id: int) -> t.List[MessageOrm | None]:
        """
        Retrieve all messages associated with a specific chat.

        This method fetches all messages that are linked to a given chat ID.
        It uses a join operation between the ChatOrm and MessageOrm tablesb
        to retrieve the messages based on the chat_id.

        Args:
            chat_id (int): The ID of the chat to retrieve messages for

        Returns:
            list[MessageOrm]: A list of messages associated with the given chat ID

        Example:
            >>> chat_repo = ChatRepository()
            >>> messages = await chat_repo.get_messages_by_chat_id(1)
            >>> print(messages)
        """
        async with get_db_session() as session:
            # Get the chat with its messages
            chat_query = select(ChatOrm).options(joinedload(ChatOrm.messages)).filter(ChatOrm.chat_id == chat_id)
            result = await session.execute(chat_query)
            chat = result.scalar_one_or_none()
            return chat.messages if chat else []
        
    async def get_chats_by_user_id(self, user_id: int) -> t.List[ChatOrm | None]:
        """
        Retrieve all chats associated with a specific user.

        This method fetches all chats that are linked to a given user ID.
        It uses a join operation between the ChatOrm and MessageOrm tables

        Args:
            user_id (int): The ID of the user to retrieve chats for

        Returns:
            list[ChatOrm]: A list of chats associated with the given user ID
            
        Example:
            >>> chat_repo = ChatRepository()
            >>> chats = await chat_repo.get_chats_by_user_id(1)
            >>> print(chats)
        """
        async with get_db_session() as session:
            query = select(ChatOrm).filter(ChatOrm.user_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()