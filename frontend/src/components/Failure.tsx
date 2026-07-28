import ThreeColumnManager from '../components/ThreeColumnManager';
import { getFailure, saveFailure } from '../lib/api'; // Adjust to your actual Wails API calls

export default function Failure({ onBack }: { onBack: () => void }) {
    return (
        <ThreeColumnManager
            title="Failure Dictionary"
            fetchData={getFailure}
            saveData={saveFailure}
            onBack={onBack}
        />
    );
}