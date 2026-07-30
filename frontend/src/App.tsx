import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Normalization from './pages/Normalization';
import Failure from './components/Failure';

import type { Page } from './types/Page';

import { CheckUpdates } from '../wailsjs/go/main/App'; 
import { BrowserOpenURL } from '../wailsjs/runtime/runtime'; 
import { service } from '../wailsjs/go/models';

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {updateInfo && (
                <div style={{ backgroundColor: '#ffcc00', padding: '10px', textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                    🚀 A new version of Scribe ({updateInfo.latestVersion}) is available! 
                    <button 
                        onClick={() => BrowserOpenURL(updateInfo.releaseUrl)}
                        style={{ marginLeft: '10px', padding: '4px 12px', cursor: 'pointer', background: 'white', border: '1px solid black', borderRadius: '4px' }}
                    >
                        Download Now
                    </button>
                </div>
            )}

            {/* Your actual App Content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {renderPage()}
            </div>
            
        </div>
    );
}