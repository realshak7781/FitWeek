from langchain_google_genai import ChatGoogleGenerativeAI
from agentStateNode import AgentState
from pydantic import BaseModel, Field
from typing import List

# Define the structure for the Auditor's feedback
class CritiqueOutput(BaseModel):
    is_validated: bool = Field(description="True if research is sufficient, False otherwise.")
    missing_info_plans: List[str] = Field(description="Specific research steps to fix gaps if is_validated is False.")

def critique_node(state: AgentState):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
    structured_llm = llm.with_structured_output(CritiqueOutput)

    research = state["research_results"]
    workout = state["workout_data"]

    prompt = f"""
    You are the 'Quality Auditor' for the FitWeek AI. 
    Review the gathered research for the workout: {workout.get('title')}.
    
    Current Research Data: {research}
    
    Evaluate if this data allows for a scientific, safe, and Stoic coaching tip.
    If it is vague or missing scientific backing for these specific exercises, 
    set is_validated to False and provide 2-3 specific new research tasks.
    """

    response = structured_llm.invoke(prompt)

    # We return the validation flag AND append the new plans to the existing list
    # Thanks to 'operator.add' in AgentState, these will be ADDED to the plan, not replace it.
    return {
        "is_validated": response.is_validated,
        "research_plan": response.missing_info_plans if not response.is_validated else []
    }