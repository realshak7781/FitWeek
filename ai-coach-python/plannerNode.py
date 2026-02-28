import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from agentStateNode import AgentState
from typing import List
from pydantic import BaseModel, Field

load_dotenv()

# Using a structured output model to ensure the LLM returns a clean list
class ResearchPlan(BaseModel):
    steps: List[str] = Field(description="A list of 4-5 specific research tasks to perform.")

def planner_node(state: AgentState):
    workout = state["workout_data"]

    # Initialize the LLM
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
    structured_llm = llm.with_structured_output(ResearchPlan)

    prompt = f"""
    You are the 'Lead Data Strategist' for FitWeek. 
    Analyze today's session to identify the key quantitative metrics for the Writer Node.
    
    WORKOUT: {workout.get('title')}
    LIFTS: {workout.get('setLogs')}
    
    Your task is to create a 4-step execution plan for the Writer:
    1. Identify the primary compound movement to be used for the 'Total Tonnage' calculation.
    2. Flag any high-RPE sets (8-10) that require specific recovery or intensity adjustments.
    3. Determine which muscle groups received the most stimulus today to check for 'overtraining' against the 7-day trend.
    4. Set the logic for the next session's 'Target Load' (e.g., +2.5kg or +1 rep) based on today's performance.
    """

    # Generate the plan
    response = structured_llm.invoke(prompt)

    # We return the list of steps to the 'research_plan' key in our State
    return {
        "research_plan": response.steps
    }