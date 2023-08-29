import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Results } from './Results';

const App = (
  <ReactQueryProvider>
    <BrowserRouter>
      <Results />
    </BrowserRouter>
  </ReactQueryProvider>
);

it('should render city input', async () => {
  render(App);

  window.history.pushState(
    {},
    '',
    '/results?cities=Toulouse&cities=Bordeaux&cities=Strasbourg&date=Wed%20Aug%2030%202023%2000%3A03%3A59%20GMT%2B0200%20%28Central%20European%20Summer%20Time%29&passengers=3'
  );

  expect(location.search).toContain('cities=Toulouse');
  expect(location.search).toContain('cities=Bordeaux');
  expect(location.search).toContain('cities=Strasbourg');
  expect(location.search).toContain(
    'date=Wed%20Aug%2030%202023%2000%3A03%3A59%20GMT%2B0200%20%28Central%20European%20Summer%20Time%29'
  );
  expect(location.search).toContain('passengers=3');

  await waitFor(() => {
    expect(screen.getByText(/passengers/)).toBeVisible();
    expect(screen.getByText(/km is total distance/)).toBeVisible();
    expect(screen.getByText(/Aug 30, 2023/)).toBeVisible();
    expect(screen.getByText(/Back/)).toBeVisible();
  });
});
