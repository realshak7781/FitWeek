from langchain_google_genai import ChatGoogleGenerativeAI
from agentStateNode import AgentState
from db_tool import get_exercise_history_7_days

def writer_node(state: AgentState):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
    workout = state["workout_data"]
    instructions = state["research_plan"] # The steps from the Planner Node

    # 1. Fetch 7-day history for each exercise in today's log
    history_context = []
    for entry in workout.get('setLogs', []):
        exercise = entry.get('exerciseName')
        hist = get_exercise_history_7_days(exercise)

        if hist:
            # Formatting the raw data for the LLM to crunch
            h_str = [f"{h.weight}kg x {h.reps} (RPE {h.rpe}) on {h.workout_date}" for h in hist]
            history_context.append(f"{exercise} 7-Day History: {h_str}")
        else:
            history_context.append(f"{exercise}: No recent history found.")

    # 2. The Refined Quantitative Coach Prompt
    prompt = f"""
    You are my Personal World-Class Workout Coach. Your goal is to provide a 
    highly specific, quantitative analysis based ONLY on the data below.

    TODAY'S WORKOUT: {workout.get('setLogs')}
    7-DAY HISTORY: {history_context}
    PLANNER INSTRUCTIONS: {instructions}

    STRICT QUANTITATIVE GUIDELINES (4 SENTENCES TOTAL):
    1. Sentence 1 (Volume Analysis): Compare today's total tonnage (weight * reps) per muscle group to the 7-day average.
    2. Sentence 2 (Imbalance Check): Call out specific muscle groups that are currently being overtrained or undertrained based on the history provided.
    3. Sentence 3 (Intensity Prescription): State a precise, RPE-adjusted load (kg) or rep target for the next session's primary lift.
    4. Sentence 4 (Exertion Goal): List the specific target RPE exertion levels for each muscle group involved to optimize future recovery.

    CONSTRAINTS: No philosophical, vague, or flowery language. Use exact numbers and percentages.
    """

    response = llm.invoke(prompt)
    return {"final_notes": response.content.strip()}