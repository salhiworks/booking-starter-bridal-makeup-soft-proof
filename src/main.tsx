import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Ibarra Real Nova (headings, figures, italic highlights) and Mulish (everything else). Latin subsets only.
import '@fontsource/ibarra-real-nova/latin-500.css';
import '@fontsource/ibarra-real-nova/latin-500-italic.css';
import '@fontsource/mulish/latin-400.css';
import '@fontsource/mulish/latin-600.css';
import '@fontsource/mulish/latin-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
