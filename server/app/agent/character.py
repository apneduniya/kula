import typing as t
from dataclasses import dataclass

from agno.agent import Agent
from agno.models.openai import OpenAIChat

from app.core.logging import logger
from app.config.settings import config
from app.static.llm import OpenAIModel
from app.agent.tools import character_tools
from app.static.prompts.character_agent import CHARACTER_AGENT_INSTRUCTIONS, CHARACTER_AGENT_ROLE
from app.models.agent.mother_agent import CharacterProfiles


@dataclass(init=False)
class Character:
    # --- Basic Information ---
    name: str  # Full name of the character
    age: int  # Current age in years
    gender: str  # Gender identity
    origin: str  # Place of birth and cultural background
    social_class: str  # Economic and social standing (e.g., upper class, working class)

    # --- Personality & Background ---
    personality: str  # Detailed personality traits and behavioral patterns
    system: str  # The world/system they belong to (e.g., fantasy, sci-fi, modern)
    bio: str  # Detailed life story and background

    # --- Knowledge & Resources ---
    topics: t.List[str]  # Subjects they're knowledgeable about or passionate about
    spendable_money: int  # Current disposable income in the world's currency

    # --- Personal Traits ---
    interests: t.List[str]  # Hobbies, activities, and things they enjoy
    goals: t.List[str]  # Short-term and long-term aspirations
    habits: t.List[str]  # Unique habits and eccentricities

    # --- Professional Life ---
    profession: str  # Profession and occupation
    skills: t.List[str]  # Professional and personal abilities
    values: t.List[str]  # Core beliefs and principles

    # --- Character Profile Module ---
    # If this is provided, the other fields will be ignored
    profile: CharacterProfiles

    def __init__(
        self,
        *,
        name: t.Optional[str] = None,
        age: t.Optional[int] = None,
        gender: t.Optional[str] = None,
        origin: t.Optional[str] = None,
        social_class: t.Optional[str] = None,
        personality: t.Optional[str] = None,
        system: t.Optional[str] = None,
        bio: t.Optional[str] = None,
        topics: t.Optional[t.List[str]] = None,
        spendable_money: t.Optional[int] = None,
        interests: t.Optional[t.List[str]] = None,
        goals: t.Optional[t.List[str]] = None,
        habits: t.Optional[t.List[str]] = None,
        profession: t.Optional[str] = None,
        skills: t.Optional[t.List[str]] = None,
        values: t.Optional[t.List[str]] = None,
        profile: t.Optional[CharacterProfiles] = None,
    ):
        """Initialize a new Character instance.

        Args:
            name (t.Optional[str], optional): The full name of the character.
            age (t.Optional[int], optional): The current age in years.
            gender (t.Optional[str], optional): The gender identity.
            origin (t.Optional[str], optional): The place of birth and cultural background.
            social_class (t.Optional[str], optional): The economic and social standing.
            personality (t.Optional[str], optional): The detailed personality traits and behavioral patterns.
            system (t.Optional[str], optional): The world/system they belong to.
            bio (t.Optional[str], optional): The detailed life story and background.
            topics (t.Optional[t.List[str]], optional): The subjects they're knowledgeable about or passionate about.
            spendable_money (t.Optional[int], optional): The current disposable income in the world's currency.
            interests (t.Optional[t.List[str]], optional): Hobbies, activities, and things they enjoy.
            goals (t.Optional[t.List[str]], optional): Short-term and long-term aspirations.
            habits (t.Optional[t.List[str]], optional): Unique habits and eccentricities.
            profession (t.Optional[str], optional): Profession and occupation.
            skills (t.Optional[t.List[str]], optional): Professional and personal abilities.
            values (t.Optional[t.List[str]], optional): Core beliefs and principles.
            profile (t.Optional[CharacterProfiles], optional): The character profile. If provided, the other fields will be ignored.
        """

        if profile:
            self.name = profile.name
            self.age = profile.age
            self.gender = profile.gender
            self.origin = profile.origin
            self.social_class = profile.social_class
            self.personality = profile.personality
            self.system = profile.system
            self.bio = profile.bio
            self.topics = profile.topics
            self.spendable_money = profile.spendable_money
            self.interests = profile.interests
            self.goals = profile.goals
            self.habits = profile.habits
            self.profession = profile.profession
            self.skills = profile.skills
            self.values = profile.values
        else:
            self.name = name
            self.age = age
            self.gender = gender
            self.origin = origin
            self.social_class = social_class
            self.personality = personality
            self.system = system
            self.bio = bio
            self.topics = topics
            self.spendable_money = spendable_money
            self.interests = interests
            self.goals = goals
            self.habits = habits
            self.profession = profession
            self.skills = skills
            self.values = values

    def to_agent(self) -> Agent:
        """Convert the Character instance to an Agent instance.

        Returns:
            Agent: The configured Agent instance for character simulation
        """
        return Agent(
            name=self.name,
            model=OpenAIChat(id=OpenAIModel.GPT_4O_MINI.value, api_key=config.OPENAI_API_KEY),

            role=CHARACTER_AGENT_ROLE,
            instructions=CHARACTER_AGENT_INSTRUCTIONS.format(
                name=self.name,
                age=self.age,
                gender=self.gender,
                origin=self.origin,
                social_class=self.social_class,
                personality=self.personality,
                system=self.system,
                bio=self.bio,
                topics=f"{', '.join(self.topics)}",
                spendable_money=self.spendable_money,
                interests=f"{', '.join(self.interests)}",
                goals=f"{', '.join(self.goals)}",
                habits=f"{', '.join(self.habits)}",
                profession=self.profession,
                skills=f"{', '.join(self.skills)}",
                values=f"{', '.join(self.values)}",
            ),

            tools=character_tools,
            # tool_choice="auto",
            show_tool_calls=True,
            add_name_to_instructions=True,
            add_datetime_to_instructions=True,
            read_chat_history=True,
            add_history_to_messages=True,
            num_history_runs=10,
            markdown=True,
            debug_mode=False,
        )

    def __str__(self) -> str:
        return f"{self.name} is a {self.age} year old {self.gender} from {self.origin} who is a {self.profession}."
