import typing as t

from sqlalchemy import or_, select, func
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import joinedload, selectinload
from app.repositories.core.base import GenericRepository
from app.repositories.core.session import get_db_session
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

    async def get_chat_by_id(self, chat_id: int) -> t.Optional[ChatOrm]:
        """
        Retrieve a chat by its ID.

        This method fetches a chat by its ID and includes its messages.
        It uses a join operation between the ChatOrm and MessageOrm tables

        Args:
            chat_id (int): The ID of the chat to retrieve

        Returns:
            ChatOrm: The chat with its messages

        Example:
            >>> chat_repo = ChatRepository()
            >>> chat = await chat_repo.get_chat_by_id(1)
            >>> print(chat)
        """
        async with get_db_session() as session:
            query = select(ChatOrm).options(selectinload(ChatOrm.messages)).filter(ChatOrm.id == chat_id)
            result = await session.execute(query)
            chat = result.scalar_one_or_none()
            return chat
    
    async def get_messages_by_chat_id(self, chat_id: int) -> t.List[MessageOrm | None]:
        """
        Retrieve all messages associated with a specific chat.

        This method fetches all messages that are linked to a given chat ID.
        It uses a join operation between the ChatOrm and MessageOrm tables
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
            chat_query = select(ChatOrm).options(selectinload(ChatOrm.messages)).filter(ChatOrm.id == chat_id)
            result = await session.execute(chat_query)
            chat = result.unique().scalars().one_or_none()
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
            return result.unique().scalars().all()
        

    async def get_paged_items(self, pageable: PageRequestSchema, params: dict) -> t.Tuple[t.List[ChatOrm], int]:
        async with get_db_session() as session:
            count_query = select(func.count()).select_from(self._model).filter_by(**params)
            total_count = (await session.execute(count_query)).scalar()

            data = []
            if total_count > 0:
                sort_column = getattr(self._model, pageable.sort)
                query = (
                    select(self._model)
                    .options(selectinload(self._model.messages))
                    .filter_by(**params)
                    .order_by(pageable.sql_sort(sort_column))
                    .limit(pageable.size)
                    .offset(pageable.offset)
                )
                result = await session.execute(query)
                data = result.scalars().all()

            return data, total_count
        
    async def get_user_id_by_chat_id(self, chat_id: int) -> int:
        """
        Retrieve the user ID associated with a specific chat.

        This method fetches the user ID from the ChatOrm table based on the provided chat ID.

        Args:
            chat_id (int): The ID of the chat to retrieve the user ID for

        Returns:
            int: The user ID associated with the given chat ID
            
        Example:
            >>> chat_repo = ChatRepository()
            >>> user_id = await chat_repo.get_user_id_by_chat_id(1)
            >>> print(user_id)
        """
        async with get_db_session() as session:
            query = select(ChatOrm.user_id).filter(ChatOrm.id == chat_id)
            result = await session.execute(query)
            return result.scalar()
        
        