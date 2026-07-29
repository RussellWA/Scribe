import { useState } from 'react';

import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Normalization from './pages/Normalization';

import type { Page } from './types/Page';
import Failure from './components/Failure';

export default function App() {
    const [page, setPage] = useState<Page>('home');

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
}
