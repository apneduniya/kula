import typing as t
import uuid

from app.repositories.core.mongo.base import GenericMongoRepository
from app.models.repository.communicator.private import PrivateCommunicatorMessageModel


class PrivateCommunicatorRepository(GenericMongoRepository[PrivateCommunicatorMessageModel]):
    """
    Repository for managing private communicator messages.
    """
    def __init__(self):
        super().__init__(PrivateCommunicatorMessageModel)

    async def send_message(self, message: PrivateCommunicatorMessageModel) -> PrivateCommunicatorMessageModel:
        """
        Send a message to the private communicator.
        """
        return await self.save(message)
    
    async def get_messages_by_sender_id(self, sender_id: uuid.UUID) -> t.List[PrivateCommunicatorMessageModel]:
        """
        Get messages by sender id.
        """
        result = await self.db.find({"sender_id": sender_id})
        return [PrivateCommunicatorMessageModel(**item) for item in result]
    
    async def get_messages_by_receiver_id(self, receiver_id: uuid.UUID) -> t.List[PrivateCommunicatorMessageModel]:
        """
        Get messages by receiver id.
        """
        result = await self.db.find({"receiver_id": receiver_id})
        return [PrivateCommunicatorMessageModel(**item) for item in result]
    
