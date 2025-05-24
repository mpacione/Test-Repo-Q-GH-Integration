import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Research from '../pages/Research';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Research Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the research form', () => {
    render(
      <BrowserRouter>
        <Research />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByLabelText('Research Query')).toBeInTheDocument();
    expect(screen.getByLabelText('Sources')).toBeInTheDocument();
    expect(screen.getByLabelText('Timeframe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start research/i })).toBeInTheDocument();
  });

  it('updates form values when changed', () => {
    render(
      <BrowserRouter>
        <Research />
      </BrowserRouter>
    );
    
    const queryInput = screen.getByLabelText('Research Query');
    fireEvent.change(queryInput, { target: { value: 'test query' } });
    
    expect(queryInput).toHaveValue('test query');
  });

  it('disables the submit button when query is empty', () => {
    render(
      <BrowserRouter>
        <Research />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /start research/i });
    expect(submitButton).toBeDisabled();
    
    const queryInput = screen.getByLabelText('Research Query');
    fireEvent.change(queryInput, { target: { value: 'test query' } });
    
    expect(submitButton).not.toBeDisabled();
  });
});