import React from 'react';
import { createRoot } from 'react-dom/client';
import AppNew from './AppNew';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppNew />
  </React.StrictMode>
);



