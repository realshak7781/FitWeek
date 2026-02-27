from typing import TypedDict, List, Annotated
import operator

class AgentState(TypedDict):
    # The raw workout data coming from Spring Boot
    workout_data: dict

    # CHANGED: Now a list so we can handle multiple research objectives
    # We use operator.add so we can append new steps if the Critique node asks for more
    research_plan: Annotated[List[str], operator.add]

    # A list of scientific facts or historical data gathered by the Research Node
    research_results: Annotated[List[str], operator.add]

    # The final Stoic insight produced by the Writer Node
    final_notes: str

    # A flag to track if the Critique Node approved the content
    is_validated: bool