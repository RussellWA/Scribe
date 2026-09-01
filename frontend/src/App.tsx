import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Normalization from './pages/Normalization';
import Failure from './components/Failure';

import type { Page } from './types/Page';

import { CheckUpdates } from '../wailsjs/go/main/App'; 
import { BrowserOpenURL } from '../wailsjs/runtime/runtime'; 
import { service } from '../wailsjs/go/models';
import TitleBar from './components/TitleBar';

export default function App() {
    const [page, setPage] = useState<Page>('home');
    
    const [updateInfo, setUpdateInfo] = useState<service.UpdateInfo | null>(null);

    useEffect(() => {
        CheckUpdates()
            .then((info: service.UpdateInfo) => {
                if (info.updateAvailable) {
                    setUpdateInfo(info);
                }
            })
            .catch((err: unknown) => console.error("Update check failed:", err));
    }, []);

    const renderPage = () => {
        switch (page) {
            case 'glossary':
                return <Glossary onBack={() => setPage('home')} />;
            case 'normalization':
                return <Normalization onBack={() => setPage('home')} />;
            case 'failure':
                return <Failure onBack={() => setPage('home')} />;
            default:
                return (              
                    <Home
                        openGlossary={() => setPage('glossary')}
                        openNormalization={() => setPage('normalization')}
                        openFailure={() => setPage('failure')}
                    />
                );
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <TitleBar />  
            {updateInfo && (
                <div className="bg-yellow-400 p-2.5 text-center text-black font-bold shrink-0">
                    🚀 A new version of Scribe ({updateInfo.latestVersion}) is available! 
                    <button 
                        onClick={() => BrowserOpenURL(updateInfo.releaseUrl)}
                        className="ml-2 px-3 py-1 cursor-pointer bg-white border border-black rounded"
                    >
                        Download Now
                    </button>
                </div>
            )}

            <div className="flex-1 min-h-0 overflow-auto">
                {renderPage()}
            </div>
            
        </div>
    );
}