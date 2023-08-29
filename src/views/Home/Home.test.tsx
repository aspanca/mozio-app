import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const App = (
  <ReactQueryProvider>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </ReactQueryProvider>
);

it('should render city input', () => {
  render(App);
  expect(screen.getByText(/City of origin/)).toBeVisible();
});

it('should render datepicker input', () => {
  render(App);
  expect(screen.getByText(/Date/)).toBeVisible();
});

it('should render passengers input', () => {
  render(App);
  expect(screen.getByText(/Passengers/)).toBeVisible();
});

it('should render add destination button', () => {
  render(App);
  expect(screen.getByText(/Add destination/)).toBeVisible();
});

it('should render submit button', () => {
  render(App);
  screen.getByText(/Submit/).click();
  expect(screen.getByText(/Submit/)).toBeVisible();
});

it('should render two city inputs when clicking add destination button', async () => {
  render(App);
  screen.getByText(/Add destination/).click();

  await waitFor(() => {
    expect(screen.getByText(/City of origin/)).toBeVisible();
    expect(screen.getByText(/City of Destination/)).toBeVisible();
  });
});

it('should display error messages for city and passengers when clicking submit button', async () => {
  render(App);
  screen.getByText(/Submit/).click();

  await waitFor(() => {
    expect(screen.getByText(/City is required/)).toBeVisible();
    expect(
      screen.getByText(/Number of passengers must be greater than zero/)
    ).toBeVisible();
  });
});

it('should open combobox with all the elements when clicking select destination', async () => {
  render(App);

  screen.getByText(/Select destination/).click();

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByPlaceholderText(/Search city.../)).toBeVisible();
  });
});

it('should display a list of options when writting in combobox input', async () => {
  render(App);

  screen.getByText(/Select destination/).click();

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  const input = screen.getByPlaceholderText(/Search city.../);

  fireEvent.change(input, { target: { value: 'T' } });

  await waitFor(() => {
    expect(screen.getByRole('option', { hidden: true })).toBeVisible();
  });
});
