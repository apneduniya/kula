import typing as t

from sqlalchemy import or_, select
from sqlalchemy.exc import NoResultFound

from app.repositories.core.base import GenericRepository
from app.repositories.core.session import get_db_session
from app.schemas.core.pageable import PageRequestSchema

from app.models.repository.message import MessageOrm


class MessageRepository(GenericRepository[MessageOrm]):
    """
    Repository class for managing message-related database operations.
    
    This repository provides methods to interact with message data in the database,
    including retrieving messages by various identifiers and paginated queries.
    
    Use Cases:
    - Managing user message history and interactions
    - Implementing chat-based features
    """
    def __init__(self):
        super().__init__(MessageOrm)
