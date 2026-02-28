from langgraph.graph import StateGraph, END
from agentStateNode import AgentState
from plannerNode import planner_node
from writerNode import writer_node

# 1. Initialize the Graph with the shared State
workflow = StateGraph(AgentState)

# 2. Add the simplified nodes
# We've removed 'researcher' and 'auditor' to eliminate latency and dependency on web search.
workflow.add_node("planner", planner_node)
workflow.add_node("writer", writer_node)

# 3. Define the linear flow
# The entry point is the Planner, which then hands off directly to the Writer.
workflow.set_entry_point("planner")
workflow.add_edge("planner", "writer")
workflow.add_edge("writer", END)

# 4. Compile the Graph
# This 'architect_brain' is what your FastAPI (main.py) calls.
architect_brain = workflow.compile()