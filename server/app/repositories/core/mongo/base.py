import typing as t

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.results import InsertOneResult

from app.core.logging import logger
from app.config.settings import config
from app.models.core.mongo.base import MongoModel
from app.repositories.core.base import BaseRepository
from app.schemas.core.pageable import PageRequestSchema


T = t.TypeVar('T', bound=MongoModel)


class GenericMongoRepository(BaseRepository[T]):
    """Generic MongoDB repository implementation.
    
    This class provides a generic implementation of the repository pattern for MongoDB,
    handling basic CRUD operations and pagination.
    
    Args:
        model: The MongoDB model class to be used by the repository.
    """
    def __init__(self, model: t.Type[T]):
        self.model = model
        self.client: t.Optional[AsyncIOMotorClient] = None
        self.db: t.Optional[AsyncIOMotorDatabase] = None

        self.__post_init__()

    def __post_init__(self):
        self.client = AsyncIOMotorClient(config.MONGO_DB_CONNECTION_STRING)
        self.db = self.client[config.MONGO_DB_NAME]

    async def save(self, entity: T) -> T:
        """Save an entity to MongoDB.
        
        Args:
            entity: The entity to save.
            
        Returns:
            T: The saved entity with updated ID.
            
        Note:
            Returns None if MongoDB is not initialized.
        """

        result: InsertOneResult = await self.db.insert_one(entity.model_dump())
        entity.id = str(result.inserted_id)
        return entity

    async def get_by_id(self, id: str) -> t.Optional[T]:
        """Retrieve an entity by its ID.
        
        Args:
            id: The ID of the entity to retrieve.
            
        Returns:
            Optional[T]: The found entity or None if not found.
            
        Note:
            Returns None if MongoDB is not initialized.
        """

        result = await self.db.find_one({"_id": id})
        if not result:
            return None

        return self.model(**result)
    
    async def get_by_ids(self, ids: t.List[str]) -> t.List[T]:
        """Retrieve multiple entities by their IDs.
        
        Args:
            ids: List of entity IDs to retrieve.
            
        Returns:
            List[T]: List of found entities.
            
        Note:
            Returns empty list if MongoDB is not initialized.
        """

        result = await self.db.find({"_id": {"$in": ids}})
        if not result:
            return []

        return [self.model(**item) for item in result]
    
    async def get_paged_items(self, pageable: PageRequestSchema, params: dict) -> t.Tuple[t.List[T], int]:
        """Retrieve paginated entities based on given parameters.
        
        Args:
            pageable: Pagination and sorting information.
            params: Filter parameters for the query.
            
        Returns:
            Tuple[List[T], int]: Tuple containing list of entities and total count.
            
        Note:
            Returns empty list and 0 if MongoDB is not initialized.
        """
        
        total_count = await self.db.count_documents(params)
        if total_count == 0:
            return [], 0
        
        sort_column = pageable.sort
        sort_direction = pageable.direction
        
        skip = (pageable.page - 1) * pageable.size
        limit = pageable.size
        
        result = await self.db.find(params).sort(sort_column, sort_direction).skip(skip).limit(limit)
        if not result:
            return [], 0
        
        return [self.model(**item) for item in result], total_count
    
    async def delete(self, entity: T) -> None:
        """Delete an entity from MongoDB.
        
        Args:
            entity: The entity to delete.
            
        Note:
            Does nothing if MongoDB is not initialized.
        """
        
        await self.db.delete_one({"_id": entity.id})

    async def delete_by_id(self, entity_id: str) -> None:
        """Delete an entity by its ID.
        
        Args:
            entity_id: The ID of the entity to delete.
            
        Note:
            Does nothing if MongoDB is not initialized.
        """
        
        await self.db.delete_one({"_id": entity_id})
    
