import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavBar } from '../components/NavBar';

describe('NavBar', () => {
  it('renders with title', () => {
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={jest.fn()} />
    );
    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  it('renders Characters dropdown', () => {
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={jest.fn()} />
    );
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('renders Episodes dropdown', () => {
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={jest.fn()} />
    );
    expect(screen.getByText('Episodes')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={jest.fn()} />
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onSearch when search is submitted', () => {
    const onSearch = jest.fn();
    render(
      <NavBar onSearch={onSearch} onDropdownSelect={jest.fn()} />
    );
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));
    
    expect(onSearch).toHaveBeenCalledWith('Rick');
  });

  it('calls onDropdownSelect when Characters dropdown option is clicked', () => {
    const onDropdownSelect = jest.fn();
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={onDropdownSelect} />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    fireEvent.click(screen.getByText('Alive'));
    
    expect(onDropdownSelect).toHaveBeenCalledWith('alive', 'character');
  });

  it('calls onDropdownSelect when Episodes dropdown option is clicked', () => {
    const onDropdownSelect = jest.fn();
    render(
      <NavBar onSearch={jest.fn()} onDropdownSelect={onDropdownSelect} />
    );
    
    fireEvent.click(screen.getByText('Episodes'));
    fireEvent.click(screen.getByText('Season 1'));
    
    expect(onDropdownSelect).toHaveBeenCalledWith('season1', 'episode');
  });
});
