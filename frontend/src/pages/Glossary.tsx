import DictionaryManager from '../components/DictionaryManager';
import { getGlossary, saveGlossary } from '../lib/api';

interface GlossaryProps {
    onBack: () => void;
}

export default function Glossary({ onBack }: GlossaryProps) {
    return (
        <DictionaryManager
            title="Glossary"
            keyLabel="Acronym"
            valueLabel="Expansion"
            fetchData={getGlossary}
            saveData={saveGlossary}
            onBack={onBack}
        />
    );
}