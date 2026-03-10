// Phase 9: Agentic AI Systems – Deep Curriculum

export const phase9AgenticAIContent = {
  id: 9,
  title: 'Phase 9: Agentic AI Systems',
  topics: [
    'Foundations of Agentic AI',
    'Tool Use & Function Calling',
    'Planning & Decomposition',
    'Memory & Context Management',
    'Graph-Based Orchestration with LangGraph',
    'Multi-Agent Collaboration',
    'Reliability, Testing & Safety',
    'Agentic Systems for Software Engineering',
    'Productionization & MLOps for Agents',
    'Advanced & Emerging Topics'
  ],
  lessons: [
    // Module 1: Foundations of Agentic AI
    {
      title: 'Module 1: Foundations of Agentic AI',
      description: `
## Foundations of Agentic AI

### Learning Objectives
- Understand why simple prompting and RAG are not enough for complex tasks
- Define what an "agent" is in modern LLM systems
- Recognize the building blocks of agentic systems: tools, memory, planning, control flow
- Get a high-level view of the agentic framework landscape (LangChain, LangGraph, AutoGen, CrewAI, etc.)

### From Prompting to Agents

- **Single-shot prompting**: One request → one response. Great for Q&A, weak for multi-step tasks.
- **RAG systems**: Add retrieval, but still mostly "one pass" through the model.
- **Agentic systems**: LLMs that can:
  - Plan multi-step strategies
  - Call tools and APIs
  - Maintain and update state over time
  - Reflect and revise actions based on feedback

### Core Agent Concepts

- **Task / Goal**: What the user ultimately wants the system to achieve.
- **Environment**: The world the agent can act on (files, APIs, databases, external services).
- **Tools**: Safe, well-defined actions the agent can perform (search, run code, query DB).
- **Memory**:
  - *Short-term*: Local context within the current session or step.
  - *Long-term*: Stored knowledge from previous runs or interactions.
- **Control Flow / Policy**: The logic that decides "what to do next".

### Agentic Framework Landscape (2026)

- **LangChain**: General LLM orchestration (prompts, tools, memory, RAG, chains, simple agents).
- **LangGraph**: Graph-based, stateful orchestration for complex multi-step workflows.
- **AutoGen**: Chat-style multi-agent interactions with human/AI agents.
- **CrewAI, BeeAI, others**: Higher-level multi-agent abstractions and specialized domains.

### Key Takeaway

Agentic AI systems treat LLMs as decision-making components inside a larger, tool-using workflow. The *agent* is the combination of an LLM, tools, memory, and explicit control logic.
      `,
      code: `# Conceptual sketch of an agent loop (pseudocode)

state = {}

while not done:
    # 1. Observe
    observation = get_observation()

    # 2. Decide (LLM + policy)
    plan_or_action = llm_decide(observation, state)

    # 3. Act via tools
    result = execute_tools(plan_or_action)

    # 4. Update state
    state = update_state(state, observation, plan_or_action, result)

    # 5. Check termination
    done = check_goal_reached(state)`
    },

    // Module 2: Single-Agent Patterns with LangChain
    {
      title: 'Module 2: Single-Agent Patterns with LangChain',
      description: `
## Single-Agent Patterns with LangChain

### Learning Objectives
- Learn how LangChain represents tools, agents, and executors
- Implement a basic tool-using agent in LangChain
- Understand planning patterns like planner+executor and ReAct-style agents

### LangChain Agent Building Blocks

- **LLM**: The reasoning engine (e.g., OpenAI, Anthropic, local models).
- **Tools**: Python functions or API wrappers with clear signatures.
- **Prompt templates**: Structured instructions + variables.
- **Agent**: A policy that uses the LLM + tools to solve tasks.
- **AgentExecutor**: Orchestrates repeated calls to the agent until completion.

### Common Patterns

- **Zero-shot tool use**:
  - Agent decides when and how to call tools based on natural language.
- **ReAct-style agents**:
  - Interleave "Thought → Action → Observation" steps.
- **Planner + executor**:
  - One model decomposes the task into steps.
  - Another component executes each step with tools.

### Practical Tips

- Start with *few tools* and add more gradually.
- Make tools *deterministic* and easy to test.
- Log agent thoughts and actions for debugging and evaluation.

### Key Takeaway

LangChain wraps the core agent building blocks you already know—LLMs, tools, prompts, and memory—into reusable patterns so you can focus on behavior instead of boilerplate.
      `,
      code: `from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, Tool, create_openai_tools_agent
from langchain.prompts import ChatPromptTemplate

def search_docs(query: str) -> str:
    \"\"\"Search your internal documentation.\"\"\"
    # Implement with your own search / RAG
    return f\"Pretend this is a search result for: {query}\"

tools = [
    Tool(
        name=\"search_docs\",
        func=search_docs,
        description=\"Search internal documentation for information.\",
    )
]

llm = ChatOpenAI(model=\"gpt-4.1\")

prompt = ChatPromptTemplate.from_messages(
    [
        (\"system\", \"You are a helpful agent that uses tools to answer questions.\"),  # noqa: E501
        (\"human\", \"{input}\"),
        (\"placeholder\", \"{agent_scratchpad}\"),
    ]
)

agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

if __name__ == \"__main__\":
    result = agent_executor.invoke({\"input\": \"How do I reset my API token?\"})
    print(result[\"output\"])`
    },

    // Module 3: Memory, Context, and Tools
    {
      title: 'Module 3: Memory, Context & Tools',
      description: `
## Memory, Context & Tools in Agentic Systems

### Learning Objectives
- Understand different types of memory in agentic workflows
- Learn how to integrate RAG as a tool rather than a monolithic system
- Design tools that are safe, composable, and easy to observe

### Memory Types

- **Short-term memory**:
  - Conversation buffer or scratchpad.
  - Holds the current task, recent observations, and temporary notes.
- **Long-term memory**:
  - Vector databases for semantic search.
  - Relational or document stores for structured knowledge.
- **Episodic memory**:
  - Past traces of agent runs.
  - Used to recall how similar tasks were solved before.

### RAG as a Tool

- Treat retrieval as **one tool** among many:
  - \`search_knowledge_base(query)\`
  - \`get_user_profile(user_id)\`
- Let the agent decide **when** to search and **how** to combine results.

### Good Tool Design

- Clear name and docstring.
- Deterministic behavior and explicit error handling.
- No hidden global state or side effects if possible.
- Idempotent where it matters (safe to retry).

### Key Takeaway

Memory and tools expand what agents can do, but they must be carefully designed so the agent remains predictable, debuggable, and safe.
      `,
      code: `# Sketch of a retrieval tool for an agent

from typing import List

def retrieve_relevant_docs(query: str, k: int = 5) -> List[str]:
    \"\"\"Retrieve up to k documents relevant to the query from a vector store.\"\"\"
    # In a real system, this would call your vector DB
    results = [f\"Doc {i} about {query}\" for i in range(1, k + 1)]
    return results`
    },

    // Module 4: Graph-Based Orchestration with LangGraph
    {
      title: 'Module 4: Graph-Based Orchestration with LangGraph',
      description: `
## Graph-Based Orchestration with LangGraph

### Learning Objectives
- Understand why explicit graphs are useful for complex workflows
- Learn core LangGraph concepts: nodes, edges, state, checkpoints
- Build a simple LangGraph flow that calls tools and branches on conditions

### Why Graphs?

- Complex workflows rarely follow a single linear chain.
- You need:
  - Conditionals (if/else)
  - Loops and retries
  - Branching paths and joins
  - Human approval checkpoints
- LangGraph lets you model these flows as **explicit graphs** with typed state.

### Core Concepts

- **State**: A structured object (e.g., Pydantic model) that holds all workflow data.
- **Node**: A step that reads/writes state (LLM call, tool, human approval).
- **Edges**: Transitions between nodes; can be conditional.
- **Checkpoints**: Save state so workflows can pause/resume.

### Key Takeaway

LangGraph is ideal when you want your agentic system to behave like a transparent state machine instead of a black-box chain of LLM calls.
      `,
      code: `# Minimal LangGraph-style pseudocode (API evolves quickly; focus on concepts)

from typing import TypedDict

class State(TypedDict):
    input: str
    plan: str
    result: str

def plan_node(state: State) -> State:
    # Call an LLM to create a plan (omitted)
    state[\"plan\"] = \"1) Search docs 2) Summarize\"
    return state

def act_node(state: State) -> State:
    # Execute tools based on the plan (omitted)
    state[\"result\"] = \"Here is your final summarized answer.\"
    return state

graph_definition = {
    \"start\": plan_node,
    \"act\": act_node,
    \"edges\": {\"start\": \"act\"},
}`
    },

    // Module 5: Multi-Agent Systems and Collaboration
    {
      title: 'Module 5: Multi-Agent Systems & Collaboration',
      description: `
## Multi-Agent Systems & Collaboration

### Learning Objectives
- Understand when and why to use multiple agents instead of one
- Learn common multi-agent roles and communication patterns
- Compare multi-agent support across frameworks (LangChain, LangGraph, AutoGen, CrewAI)

### When Multi-Agent Makes Sense

- Tasks naturally decompose into **roles**:
  - Planner, researcher, coder, tester, reviewer, operator.
- You want **separation of concerns**:
  - Different prompts, tools, and policies for each role.
- You want **parallelization** where possible.

### Communication Patterns

- **Coordinator pattern**:
  - One manager agent routes tasks to specialist agents.
- **Peer-to-peer pattern**:
  - Agents talk directly and negotiate.
- **Blackboard pattern**:
  - Agents read/write to a shared memory board.

### Framework Comparison (High Level)

- **LangChain + LangGraph**:
  - Great for explicit, inspectable workflows.
  - Good choice when you care about reliability and observability.
- **AutoGen**:
  - Strong at chat-style conversations between agents and humans.
- **CrewAI and others**:
  - Provide higher-level abstractions like "crew" and "tasks".

### Key Takeaway

Multi-agent setups are powerful but add complexity. Use them when roles are clearly distinct or when you need parallel specialization.
      `,
      code: `# Conceptual example of multi-agent roles (pseudocode)

class Agent:
    def __init__(self, name, tools):
        self.name = name
        self.tools = tools

    def act(self, message: str) -> str:
        # Call LLM + tools here (omitted)
        return f\"[{self.name}] processed: {message}\"

planner = Agent(\"planner\", tools=[\"search\", \"decompose_task\"])
researcher = Agent(\"researcher\", tools=[\"search\", \"summarize\"])

message = \"User wants a market analysis of AI agent frameworks.\"
plan = planner.act(message)
report = researcher.act(plan)
print(report)`
    },

    // Module 6: Reliability, Evaluation & Safety
    {
      title: 'Module 6: Reliability, Evaluation & Safety',
      description: `
## Reliability, Evaluation & Safety in Agentic Systems

### Learning Objectives
- Identify common failure modes in agentic workflows
- Design tests and evaluation harnesses for agents
- Apply safety principles like least privilege and human-in-the-loop control

### Failure Modes

- **Hallucinated tools or arguments**:
  - The agent calls non-existent APIs or uses invalid parameters.
- **Infinite loops / ping-pong**:
  - Two agents keep handing work back and forth.
- **Task drift**:
  - The agent gradually moves away from the original goal.
- **Unsafe side effects**:
  - Destructive actions without confirmation (deleting data, sending payments).

### Evaluation Strategies

- Unit tests for individual tools and nodes.
- Scenario tests for end-to-end workflows.
- Metrics:
  - Task success rate
  - Latency and cost
  - Safety violations / escalations to human

### Safety Principles

- **Least privilege**:
  - Each agent only has access to the tools it truly needs.
- **Approval gates**:
  - Require human confirmation for high-impact actions.
- **Audit logs**:
  - Record every tool call, argument, and result.

### Key Takeaway

Agentic systems are powerful but must be engineered like critical software: with tests, monitoring, and strong safety controls.
      `,
      code: `# Pseudocode for a guarded tool

def delete_resource(resource_id: str, approved: bool = False) -> str:
    \"\"\"Dangerous operation: permanently deletes a resource.\"\"\"
    if not approved:
        raise PermissionError(\"Deletion not approved by human.\")
    # Perform deletion here
    return f\"Resource {resource_id} deleted.\"`
    },

    // Module 7: Agentic Systems for Software Engineering
    {
      title: 'Module 7: Agentic Systems for Software Engineering',
      description: `
## Agentic Systems for Software Engineering

### Learning Objectives
- Understand common patterns for code-focused agents (spec → implement → review → test)
- Learn how to integrate agents with Git, issue trackers, and CI
- Explore long-running "AI engineer" agents with memory

### Typical Dev Flow for Agents

1. **Specification**:
   - Translate user stories into technical tasks.
2. **Design**:
   - Propose architecture, file changes, and data models.
3. **Implementation**:
   - Edit code, run linters/tests.
4. **Review**:
   - Critic agent checks for issues, style, and tests.
5. **Integration**:
   - Open PRs, link to tickets, update documentation.

### Integration Points

- Tools for:
  - Git operations (diff, commit, branch).
  - Issue tracker APIs (Jira, GitHub Issues).
  - CI/CD systems (trigger builds, read logs).

### Long-Running Agents

- Maintain project memory:
  - Past changes, architectural decisions, tech debt items.
- Schedule:
  - Nightly maintenance (dependency updates, refactors).

### Key Takeaway

Agentic systems can act like junior (or senior) engineers, but need robust guardrails, observability, and human code owners.
      `,
      code: `# Sketch: high-level steps for a "code agent" (no framework-specific code)

def run_code_agent(task_description: str) -> None:
    spec = generate_spec(task_description)
    design = propose_design(spec)
    changes = implement_changes(design)
    review = run_code_review(changes)
    if review[\"approved\"]:
        open_pull_request(changes, spec, design)
    else:
        print(\"Review failed, needs human attention.\")`
    },

    // Module 8: Productionization & MLOps for Agents
    {
      title: 'Module 8: Productionization & MLOps for Agents',
      description: `
## Productionization & MLOps for Agents

### Learning Objectives
- Learn deployment patterns for agentic workflows
- Design observability for agents (logs, traces, metrics)
- Understand versioning and rollout strategies

### Serving Architectures

- **Serverless functions**: Good for short-lived tasks.
- **Long-running workers + queues**: Better for complex workflows and retries.
- **Hybrid**: Use serverless for front-door requests, workers for heavy lifting.

### Observability

- Structured logs of:
  - Steps taken
  - Tools called
  - Final outcomes
- Traces:
  - Visualize the graph of calls and state changes.
- Metrics:
  - Success rate, latency, cost per request, error categories.

### Versioning and Rollouts

- Version prompts, flows, and tools.
- Use canary releases / A-B tests:
  - Route a fraction of traffic to new behaviors.
- Roll back quickly on regressions.

### Key Takeaway

Shipping an agent is only the beginning—you must monitor, version, and improve it like any other production service.
      `,
      code: `# Simple example of logging an agent step

import logging

logger = logging.getLogger(\"agent\")

def log_step(step_name: str, state: dict) -> None:
    logger.info(\"step=%s state=%s\", step_name, state)`
    },

    // Module 9: Advanced & Emerging Topics
    {
      title: 'Module 9: Advanced & Emerging Topics in Agentic AI',
      description: `
## Advanced & Emerging Topics in Agentic AI

### Learning Objectives
- Explore adaptive and learning agents beyond prompt engineering
- Understand multi-modal and real-world agent scenarios
- Get a sense of open research problems in agentic AI

### Adaptive Agents

- Learn from:
  - Past traces and outcomes (success/failure).
  - Human feedback (thumbs up/down, edited outputs).
- Techniques:
  - Bandit-style selection of tools or prompts.
  - Preference learning from human choices.

### Multi-Modal & Real-World Agents

- Combine language, vision, and audio tools:
  - Read documents, parse UIs, inspect charts.
- Treat APIs and devices as the "environment":
  - Smart home controllers
  - Robotic process automation (RPA)

### Research Frontiers

- Robust planning under uncertainty.
- Aligning autonomous agents with human values and policies.
- Understanding emergent behavior in multi-agent societies.

### Key Takeaway

Agentic AI is still rapidly evolving. The most important skill is learning how to *evaluate* and *iterate* on agent behaviors safely as new capabilities appear.
      `,
      code: `# No concrete code here – this module is conceptual and discussion-focused.
pass`
    }
  ]
};

