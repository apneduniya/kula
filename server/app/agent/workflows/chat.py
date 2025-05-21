import typing as t

from agno.agent import Agent
from agno.workflow import Workflow, RunResponse
from agno.models.openai import OpenAIChat
from agno.storage.postgres import PostgresStorage

from app.core.logging import logger
from app.config.settings import config
from app.models.agent.questioning_agent import QuestioningAgentResponseModel
from app.static.prompts.questioning_agent import QUESTIONING_AGENT_SYSTEM_MESSAGE
from app.static.prompts.mother_agent import (
    MOTHER_AGENT_DESCRIPTION,
    MOTHER_AGENT_GOAL,
    MOTHER_AGENT_INSTRUCTIONS,
)
from app.models.agent.mother_agent import MotherAgentResponseModel
from app.static.llm import OpenAIModel
from app.agent.tools import research_tools
from app.agent.character import Character
from app.agent.world_simulator import WorldSimulator


class ChatWorkflow(Workflow):
    questioning_agent: Agent = Agent(
        model=OpenAIChat(id=OpenAIModel.GPT_4O_MINI.value, api_key=config.OPENAI_API_KEY),
        system_message=QUESTIONING_AGENT_SYSTEM_MESSAGE,
        response_model=QuestioningAgentResponseModel,
        tools=research_tools,

        tool_choice="auto",
        show_tool_calls=True,
        add_datetime_to_instructions=True,
        read_chat_history=True,
        add_history_to_messages=True,
        num_history_runs=10,
        markdown=True,
        debug_mode=False,
    )
    mother_agent: Agent = Agent(
        model=OpenAIChat(id=OpenAIModel.GPT_4O_MINI.value, api_key=config.OPENAI_API_KEY),
        description=MOTHER_AGENT_DESCRIPTION,
        goal=MOTHER_AGENT_GOAL,
        instructions=MOTHER_AGENT_INSTRUCTIONS,
        response_model=MotherAgentResponseModel,
        tools=research_tools,

        tool_choice="auto",
        show_tool_calls=True,
        add_datetime_to_instructions=True,
        read_chat_history=True,
        add_history_to_messages=True,
        num_history_runs=10,
        markdown=True,
        debug_mode=False,
    )

    def get_questions(self, user_message: str) -> t.Optional[QuestioningAgentResponseModel]:
        try:
            logger.info(f"Getting questions for user_message: {user_message}")
            response: RunResponse = self.questioning_agent.run(user_message)

            # Check if we got a valid response
            if not response or not response.content:
                logger.warning(f"No response from questioning agent for user_message: {user_message}")
                return None

            # Check if the response is of the expected type
            if not isinstance(response.content, QuestioningAgentResponseModel):
                logger.warning(f"Invalid response type from questioning agent for user_message: {user_message}")
                return None

            return response.content

        except Exception as e:
            logger.error(f"Error in get_questions: {e}")
            return None

    def get_characters(self, user_message: str) -> t.Optional[MotherAgentResponseModel]:
        try:
            logger.info(f"Getting characters for user_message: {user_message}")
            response: RunResponse = self.mother_agent.run(user_message)

            # Check if we got a valid response
            if not response or not response.content:
                logger.warning(f"No response from character agent for user_message: {user_message}")
                return None
            # Check if the response is of the expected type
            if not isinstance(response.content, MotherAgentResponseModel):
                logger.warning(f"Invalid response type from character agent for user_message: {user_message}")
                return None
            
            return response.content

        except Exception as e:
            logger.error(f"Error in get_characters: {e}")
            
        return None


    def run(self, user_message: str) -> t.Iterator[RunResponse]:
        logger.info(f"Running ChatWorkflow for user_message: {user_message}")

        # Getting information from the user
        questioning_agent_response: t.Optional[QuestioningAgentResponseModel] = self.get_questions(user_message)

        if not questioning_agent_response:
            yield RunResponse(
                content="Sorry, something went wrong. Please try again later."
            )
            return
        
        # If the agent is asking questions, send the questions to the user, else move forward
        if questioning_agent_response.is_asking_question:
            logger.info(f"Asking questions to the user: {questioning_agent_response.question}")
            yield RunResponse(
                content=questioning_agent_response.question,
            )
            return

        # Ask the mother agent to generate characters for the world simulation
        mother_agent_response: t.Optional[MotherAgentResponseModel] = self.get_characters(user_message)

        if not mother_agent_response:
            yield RunResponse(
                content="Sorry, could not generate characters. Please try again later."
            )
            return
        
        logger.info(f"{len(mother_agent_response.characters)} characters generated: {mother_agent_response.characters}")
        
        # Create a list of characters from the mother agent response
        characters: t.List[Character] = [Character(profile=character) for character in mother_agent_response.characters]

        # Create a world simulator
        world_simulator: WorldSimulator = WorldSimulator(characters=characters, proposal=user_message)

        logger.info(f"World simulator created. Running the simulation...")

        yield from world_simulator.to_team().run(f"The proposal which you need to simulate the world is: {user_message}. The agents will act like target audience/effected user of this proposal and respond to the proposal.", stream=True)


def get_chat_workflow(
    user_id: t.Optional[int] = None,
    session_id: t.Optional[str] = None,
    debug_mode: bool = False
) -> ChatWorkflow:
    chat_storage = PostgresStorage(
        table_name="agent_chat",
        db_url=config.DATABASE_URL
    )

    return ChatWorkflow(
        storage=chat_storage,
        user_id=user_id,
        session_id=session_id,
        debug_mode=debug_mode
    )