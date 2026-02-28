import os
from tavily import TavilyClient
from agentStateNode import AgentState


# Initialize Tavily
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def research_node(state: AgentState):
    plans = state["research_plan"]
    results = []

    # Iterate through the 4-5 items in your List[str]
    for step in plans:
        print(f"Architect researching: {step}")

        # 'advanced' depth provides better scientific context for fitness
        search_result = tavily.search(query=step, search_depth="advanced")

        for context in search_result.get('results', []):
            results.append(f"Source: {context['url']}\nInsight: {context['content']}")

    return {
        "research_results": results
    }