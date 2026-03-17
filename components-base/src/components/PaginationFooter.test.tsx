import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationFooter } from '../components/PaginationFooter';

describe('PaginationFooter', () => {
  it('renders nothing when totalPages is 1 or less', () => {
    const { container } = render(
      <PaginationFooter currentPage={1} totalPages={1} onPageChange={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination buttons when there are multiple pages', () => {
    render(
      <PaginationFooter currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('calls onPageChange with 1 when First is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    
    fireEvent.click(screen.getByText('First'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with totalPages when Last is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    
    fireEvent.click(screen.getByText('Last'));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('calls onPageChange with currentPage - 1 when Prev is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    
    fireEvent.click(screen.getByText('Prev'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when Next is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when Prev is clicked on first page', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );
    
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when Next is clicked on last page', () => {
    const onPageChange = jest.fn();
    render(
      <PaginationFooter currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('disables First and Prev buttons on first page', () => {
    render(
      <PaginationFooter currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );
    
    const firstButton = screen.getByText('First');
    const prevButton = screen.getByText('Prev');
    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it('disables Next and Last buttons on last page', () => {
    render(
      <PaginationFooter currentPage={5} totalPages={5} onPageChange={jest.fn()} />
    );
    
    const nextButton = screen.getByText('Next');
    const lastButton = screen.getByText('Last');
    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });
});
