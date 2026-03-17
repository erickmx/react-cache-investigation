import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Categories } from '../components/Categories';

describe('Categories', () => {
  it('renders Characters button', () => {
    render(
      <Categories activeCategory="characters" onCategoryChange={jest.fn()} />
    );
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('renders Episodes button', () => {
    render(
      <Categories activeCategory="characters" onCategoryChange={jest.fn()} />
    );
    expect(screen.getByText('Episodes')).toBeInTheDocument();
  });

  it('calls onCategoryChange with characters when Characters button is clicked', () => {
    const onCategoryChange = jest.fn();
    render(
      <Categories activeCategory="episodes" onCategoryChange={onCategoryChange} />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    expect(onCategoryChange).toHaveBeenCalledWith('characters');
  });

  it('calls onCategoryChange with episodes when Episodes button is clicked', () => {
    const onCategoryChange = jest.fn();
    render(
      <Categories activeCategory="characters" onCategoryChange={onCategoryChange} />
    );
    
    fireEvent.click(screen.getByText('Episodes'));
    expect(onCategoryChange).toHaveBeenCalledWith('episodes');
  });

  it('applies active style to active category', () => {
    render(
      <Categories activeCategory="characters" onCategoryChange={jest.fn()} />
    );
    
    const charactersButton = screen.getByText('Characters');
    const episodesButton = screen.getByText('Episodes');
    
    expect(charactersButton).toHaveClass('bg-blue-500 text-white');
    expect(episodesButton).not.toHaveClass('bg-blue-500 text-white');
  });

  it('applies inactive style to inactive category', () => {
    render(
      <Categories activeCategory="episodes" onCategoryChange={jest.fn()} />
    );
    
    const charactersButton = screen.getByText('Characters');
    const episodesButton = screen.getByText('Episodes');
    
    expect(episodesButton).toHaveClass('bg-blue-500 text-white');
    expect(charactersButton).not.toHaveClass('bg-blue-500 text-white');
  });
});
