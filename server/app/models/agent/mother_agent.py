import typing as t

from pydantic import BaseModel


class CharacterProfiles(BaseModel):
    name: str  # Full name of the character
    age: int  # Current age in years
    gender: str  # Gender identity
    origin: str  # Place of birth and cultural background
    social_class: str  # Economic and social standing (e.g., upper class, working class)
    personality: str  # Detailed personality traits and behavioral patterns
    system: str  # The world/system they belong to (e.g., fantasy, sci-fi, modern)
    bio: str  # Detailed life story and background
    topics: t.List[str]  # Subjects they're knowledgeable about or passionate about
    spendable_money: int  # Current disposable income in the world's currency
    interests: t.List[str]  # Hobbies, activities, and things they enjoy
    goals: t.List[str]  # Short-term and long-term aspirations
    habits: t.List[str]  # Unique habits and eccentricities
    profession: str  # Profession and occupation
    skills: t.List[str]  # Professional and personal abilities
    values: t.List[str]  # Core beliefs and principles

    


class MotherAgentResponseModel(BaseModel):
    characters: t.List[CharacterProfiles]


