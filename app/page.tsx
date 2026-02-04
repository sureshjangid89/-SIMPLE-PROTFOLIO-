"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: prompt })
      });

      if (!result.ok) {
        const payload = await result.json();
        throw new Error(payload.error || "Unexpected error");
      }

      const data = await result.json();
      setResponse(data.reply);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="agent-shell">
      <form onSubmit={submitPrompt} className="agent-form">
        <label htmlFor="prompt">Describe the coding task</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="e.g. Create a Next.js API route that validates input and returns JSON."
          rows={6}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask the agent"}
        </button>
      </form>

      <div className="agent-output">
        <h2>Agent Response</h2>
        {error && <p className="error">{error}</p>}
        {!error && !response && (
          <p className="placeholder">The agent output will appear here.</p>
        )}
        {response && <pre>{response}</pre>}
      </div>

      <aside className="agent-guidance">
        <h3>What this agent can do</h3>
        <ul>
          <li>Generate code snippets with explanations.</li>
          <li>Recommend file structure for new features.</li>
          <li>Suggest tests or edge cases to validate.</li>
          <li>Provide step-by-step refactor plans.</li>
        </ul>
      </aside>
    </section>
  );
}
