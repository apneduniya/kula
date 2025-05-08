from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi.exceptions import RequestValidationError
from httpx import HTTPError
from pydantic import ValidationError
from starlette.exceptions import HTTPException

from app.config import exception_config as exh
from app.config.settings import config
from app.core.logging import logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start Up Event
    logger.info("S E R V E R   S T A R T I N G . . . . . . . . . .")
    yield

    # Shut Down Event
    logger.info("S E R V E R   S H U T D O W N . . . . . . . . . .")


def create_application() -> FastAPI:
    logger.info("Creating FastAPI application...")
    app = FastAPI(
        title=config.PROJECT_NAME,
        description=config.PROJECT_DESCRIPTION,
        version=config.PROJECT_VERSION,
        lifespan=lifespan
    )

    if config.ENVIRONMENT == "production":
        app.openapi_url = None

    app.add_middleware(
        CORSMiddleware,
        allow_origins=config.ORIGINS,
        allow_credentials=config.ALLOWED_CREDENTIALS,
        allow_methods=config.ALLOWED_METHODS,
        allow_headers=config.ALLOWED_HEADERS,
    )

    logger.info("Adding exception handlers...")
    #  I N C L U D E   E X C E P T I O N S  H A N D L E R S

    app.add_exception_handler(RequestValidationError, exh.req_validation_handler)
    app.add_exception_handler(ValidationError, exh.validation_handler)
    app.add_exception_handler(AttributeError, exh.attribute_error_handler)

    app.add_exception_handler(HTTPError, exh.http_error_handler)
    app.add_exception_handler(HTTPException, exh.http_exception_handler)

    # logger.info("Including routers...")
    # TODO: Include routers

    logger.info("Application setup complete")
    return app


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting server with uvicorn...")
    uvicorn.run(
        "app.main:create_application",
        factory=True,
        log_level=config.LOG_LEVEL.lower(),
        access_log=True,
        reload=True,
    )

