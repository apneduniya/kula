import typing as t
from dataclasses import dataclass

from agno.team import Team
from agno.models.openai import OpenAIChat
from agno.agent import Agent

from app.agent.character import Character
from app.static.llm import OpenAIModel
from app.config.settings import config
from app.static.prompts.world_simulator import WORLD_SIMULATOR_INSTRUCTIONS, WORLD_SIMULATOR_SUCCESS_CRITERIA


@dataclass(init=False)
class WorldSimulator:
    proposal: str
    characters: t.List[Character]

    def __init__(
        self,
        *,
        proposal: t.Optional[str] = None,
        characters: t.Optional[t.List[Character]] = None,
    ):
        """Initialize a new WorldSimulator instance.

        Args:
            proposal (t.Optional[str], optional): The proposal or decision to be simulated. 
                This represents the scenario or situation that the characters will react to.
                Defaults to None.
            characters (t.Optional[t.List[Character]], optional): List of Character instances 
                that will participate in the simulation. Each character will be converted to 
                an Agent for the simulation. Defaults to None.

        Note:
            Both parameters are optional but should be provided for meaningful simulation.
            The characters will be converted to Agents and configured to collaborate in 
            simulating the world's response to the proposal.
        """
        self.proposal = proposal
        self.characters = characters

        self._team: t.Optional[Team] = None

        self.__post_init__()

    def __post_init__(self):
        members: t.List[Agent] = []
        for character in self.characters:
            members.append(character.to_agent())

        self._team = Team(
            name="World simulator",
            mode="collaborate",
            model=OpenAIChat(id=OpenAIModel.GPT_4O.value, api_key=config.OPENAI_API_KEY),
            members=members,

            instructions=WORLD_SIMULATOR_INSTRUCTIONS,
            success_criteria=WORLD_SIMULATOR_SUCCESS_CRITERIA,

            enable_team_history=True,
            share_member_interactions=True,
            read_team_history=True,
            show_tool_calls=True,
            markdown=True,
            debug_mode=True,
            show_members_responses=True,
            add_datetime_to_instructions=True,
        )

    def to_team(self) -> Team:
        """Returns the Team instance that simulates the world and its characters.
        
        The Team is configured to:
        - Collaborate between character agents
        - Use GPT-4 for simulation
        - Follow world simulator instructions
        - Show tool calls and member responses
        - Include datetime context
        
        Returns:
            Team: The configured Team instance for world simulation
        """
        return self._team


    

    



