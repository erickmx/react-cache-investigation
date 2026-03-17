import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationItem } from '../components/PaginationItem';
import { PaginationGroup } from '../components/PaginationGroup';

describe('PaginationItem', () => {
  it('renders page number', () => {
    render(<PaginationItem pageNumber={1} onClick={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onClick with page number when clicked', () => {
    const onClick = jest.fn();
    render(<PaginationItem pageNumber={5} onClick={onClick} />);
    
    fireEvent.click(screen.getByText('5'));
    expect(onClick).toHaveBeenCalledWith(5);
  });

  it('applies active styles when isActive is true', () => {
    render(<PaginationItem pageNumber={1} onClick={jest.fn()} isActive={true} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('bg-blue-500 text-white');
  });

  it('applies inactive styles when isActive is false', () => {
    render(<PaginationItem pageNumber={1} onClick={jest.fn()} isActive={false} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('bg-gray-200 text-gray-700');
  });
});

describe('PaginationGroup', () => {
  it('renders all page numbers', () => {
    render(
      <PaginationGroup 
        pages={[1, 2, 3]} 
        currentPage={1} 
        onPageChange={jest.fn()} 
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders nothing when pages array is empty', () => {
    const { container } = render(
      <PaginationGroup 
        pages={[]} 
        currentPage={1} 
        onPageChange={jest.fn()} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('marks current page as active', () => {
    render(
      <PaginationGroup 
        pages={[1, 2, 3]} 
        currentPage={2} 
        onPageChange={jest.fn()} 
      />
    );
    expect(screen.getByText('2')).toHaveClass('bg-blue-500 text-white');
  });

  it('calls onPageChange when page is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationGroup 
        pages={[1, 2, 3]} 
        currentPage={1} 
        onPageChange={onPageChange} 
      />
    );
    
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
