import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

// override fetch to stub data
// @ts-expect-error override
window.fetch = async () => {
  return {
    status: 200,
    ok: true,
    json: async () => [
      {
        id: 1,
        title: 'test',
        completed: 'false'
      }
    ]
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
