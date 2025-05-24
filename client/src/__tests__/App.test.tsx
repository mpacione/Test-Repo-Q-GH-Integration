import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

// Mock the components to avoid rendering the full tree
jest.mock('../pages/Dashboard', () => () => <div data-testid="dashboard">Dashboard</div>);
jest.mock('../pages/Research', () => () => <div>Research</div>);
jest.mock('../pages/Results', () => () => <div>Results</div>);
jest.mock('../pages/Settings', () => () => <div>Settings</div>);
jest.mock('../pages/NotFound', () => () => <div>Not Found</div>);

const queryClient = new QueryClient();

describe('App', () => {
  it('renders the dashboard by default', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});