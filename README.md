# SIMPLE Portfolio – Coding AI Agent

This project now hosts a lightweight Next.js app that demonstrates a coding AI agent workflow.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your-key"
   ```
   Optional: set `OPENAI_MODEL` (defaults to `gpt-4o-mini`).
3. Run the dev server:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000` to interact with the agent UI.

## What the agent does

- Accepts a coding request from the UI.
- Sends the prompt to the API route at `/api/agent`.
- Returns a structured response with suggestions or code snippets.
