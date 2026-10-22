import { useEffect } from 'react';
import { CallLLM } from '../bindings/changeme/backend/llm/llmservice';

function App() {
    useEffect(() => {
        console.log("this")
        CallLLM();
    }, []);

    return (
        <>
            Tes
        </>
    )
}

export default App
