from datetime import datetime
import typing as t  

from pydantic import BaseModel
from pydantic import Field
from app.models.core.base import BaseOrm


class BaseSchema(BaseModel):
    __orm__ = None
    __transient_fields__ = ["id", "created_at", "updated_at"]
    class Config:
        from_attributes = True

    id: t.Optional[int] = Field(default=None, read_only=True)
    created_at: t.Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: t.Optional[datetime] = Field(default_factory=datetime.utcnow)

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        if self.created_at:
            data['created_at'] = self.created_at.isoformat()
        if self.updated_at:
            data['updated_at'] = self.updated_at.isoformat()
        return data

    def to_orm(self):
        if not self.__orm__:
            raise NotImplementedError("Error __orm__ class not set")

        orm = self.__orm__()

        def set_val(key, data):
            if (isinstance(data, BaseOrm) or isinstance(data, list)) and key not in self.__transient_fields__:
                setattr(orm, key, data)
            else:
                for key, value in data:
                    try:
                        if isinstance(value, list):
                            set_val(key, [item.to_orm() for item in value if isinstance(item, BaseSchema)])
                        elif isinstance(value, BaseSchema) and key not in self.__transient_fields__:
                            setattr(orm, key, value.to_orm())
                        elif value is not None and key not in self.__transient_fields__:
                            setattr(orm, key, value)
                    except AttributeError as e:
                        pass

        set_val(None, self)

        return orm