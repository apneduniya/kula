import typing as t

from pydantic_settings import BaseSettings
from pydantic import field_validator


class Config(BaseSettings):
    """Configuration class for the Kula application.
    
    Manages application settings including project details, database configuration,
    API keys, and environment variables.
    """
    # Basic details
    PROJECT_NAME: str = "Kula"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_DESCRIPTION: str = "Futarchy x AI based world simulator"

    # Application Configuration
    LOG_LEVEL: str = "INFO"
    ENVIRONMENT: str = "development"
    LOGS_DIR: str = "logs"
    ORIGINS: list[str] = ["*"]
    ALLOWED_CREDENTIALS: bool = True
    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Frontend Configuration
    FRONTEND_URL: str = ""

    # Database Configuration
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "postgres"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    DATABASE_URL: str = ""
    ASYNC_DATABASE_URL: str = ""
    DB_ECHO: bool = False

    MONGO_DB_CONNECTION_STRING: str = ""
    MONGO_DB_NAME: str = ""

    # Agno Configuration
    AGNO_MONITOR: bool = False

    # Other Configurations
    OPENAI_API_KEY: str
    COMPOSIO_API_KEY: str

    def get_database_url(self) -> str:
        """
        Get the synchronous database connection URL.
        
        Returns:
            str: The database URL. If DATABASE_URL is set in environment variables,
                 returns that value. Otherwise, constructs a URL using the individual
                 PostgreSQL configuration parameters.
                 
        Example:
            >>> config.get_database_url()
            'postgresql://postgres:postgres@localhost:5432/avasara'
        """
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    def get_async_database_url(self) -> str:
        """
        Get the asynchronous database connection URL.
        
        Returns:
            str: The async database URL. If ASYNC_DATABASE_URL is set in environment variables,
                 returns that value. Otherwise, constructs a URL using the individual
                 PostgreSQL configuration parameters with asyncpg driver.
                 
        Example:
            >>> config.get_async_database_url()
            'postgresql+asyncpg://postgres:postgres@localhost:5432/avasara'
            
        Note:
            This URL is specifically formatted for use with asyncpg driver and is used
            by SQLAlchemy's async engine for asynchronous database operations.
        """
        if self.ASYNC_DATABASE_URL:
            return self.ASYNC_DATABASE_URL
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"
        case_sensitive = True

    @field_validator("LOG_LEVEL")
    @classmethod
    def validate_log_level(cls, v: str) -> str:
        """Validate that log level is a valid logging level."""
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        v = v.upper()
        if v not in valid_levels:
            raise ValueError(f"Log level must be one of {valid_levels}")
        return v


config = Config() 