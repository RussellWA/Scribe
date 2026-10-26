import { useState } from 'react';
import { CallLLM } from '../bindings/changeme/backend/llm/llmservice';

function App() {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const result = await CallLLM();
            console.log(result);
        } catch (error) {
            console.error("Failed to call LLM:", error);
        } finally {
            setLoading(false);
        }
    };

    return <button onClick={onClick} disabled={loading}>Ask</button>;
}

export default App