import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (String(url).includes('/health')) {
      return Promise.resolve({
        ok: true,
        headers: {
          get: () => 'text/plain'
        },
        text: () => Promise.resolve('OK')
      });
    }

    return Promise.resolve({
      ok: true,
      headers: {
        get: () => 'application/json'
      },
      json: () => Promise.resolve([])
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders product dashboard heading', async () => {
  render(<App />);
  expect(screen.getByText(/manage products with a simple react client/i)).toBeInTheDocument();
  expect(await screen.findByText(/api is running/i)).toBeInTheDocument();
});
