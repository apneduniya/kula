import typing as t

from app.repositories.core.mongo.base import GenericMongoRepository
from app.models.repository.communicator.world import WorldCommunicatorMessageModel


class WorldCommunicatorRepository(GenericMongoRepository[WorldCommunicatorMessageModel]):
    """
    Repository for managing world communicator messages.
    """
    def __init__(self):
        super().__init__(WorldCommunicatorMessageModel)

    async def send_message(self, message: WorldCommunicatorMessageModel) -> WorldCommunicatorMessageModel:
        """
        Send a message to the world communicator.
        """
        return await self.save(message)
    
    async def get_all_messages(self) -> t.List[WorldCommunicatorMessageModel]:
        """
        Get all messages.
        """
        result = await self.db.find({})
        return [WorldCommunicatorMessageModel(**item) for item in result]
    



