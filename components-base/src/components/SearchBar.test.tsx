import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar onSearch={jest.fn()} placeholder="Find character..." />);
    expect(screen.getByPlaceholderText('Find character...')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.submit(screen.getByRole('button'));
    
    expect(onSearch).toHaveBeenCalledWith('Rick');
  });

  it('calls onSearch with empty string when submitted without input', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    fireEvent.submit(screen.getByRole('button'));
    
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Morty' } });
    
    expect(input).toHaveValue('Morty');
  });
});
