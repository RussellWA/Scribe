import { useState } from 'react';

import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Normalization from './pages/Normalization';

import type { Page } from './types/Page';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  switch (page) {
    case 'glossary':
      return <Glossary onBack={() => setPage('home')} />;

    case 'normalization':
      return <Normalization onBack={() => setPage('home')} />;

    default:
      return (
        <Home
          openGlossary={() => setPage('glossary')}
          openNormalization={() => setPage('normalization')}
        />
      );
  }
}
