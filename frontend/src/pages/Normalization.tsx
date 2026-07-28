import DictionaryManager from '../components/DictionaryManager';
import { getNormalization, saveNormalization } from '../lib/api';

interface NormalizationProps {
    onBack: () => void;
}

export default function Normalization({ onBack }: NormalizationProps) {
    return (
        <DictionaryManager
            title="Normalization"
            keyLabel="Slang"
            valueLabel="Proper Word"
            fetchData={getNormalization}
            saveData={saveNormalization}
            onBack={onBack}
        />
    );
}