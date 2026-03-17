import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../components/Card';
import { CardImage } from '../components/CardImage';
import { CardBody } from '../components/CardBody';

describe('CardImage', () => {
  it('renders image with src and alt', () => {
    render(<CardImage src="test.jpg" alt="Test alt" />);
    const img = screen.getByAltText('Test alt');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('uses default alt text when not provided', () => {
    render(<CardImage src="test.jpg" />);
    const img = screen.getByAltText('Card image');
    expect(img).toBeInTheDocument();
  });
});

describe('CardBody', () => {
  it('renders title', () => {
    render(<CardBody title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<CardBody title="Test" description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<CardBody title="Test" />);
    expect(screen.queryByText(/description/)).not.toBeInTheDocument();
  });

  it('renders See more button when onSeeMore is provided', () => {
    const onSeeMore = jest.fn();
    render(<CardBody title="Test" onSeeMore={onSeeMore} />);
    expect(screen.getByText('See more')).toBeInTheDocument();
  });

  it('does not render See more button when onSeeMore is not provided', () => {
    render(<CardBody title="Test" />);
    expect(screen.queryByText('See more')).not.toBeInTheDocument();
  });

  it('calls onSeeMore when See more is clicked', () => {
    const onSeeMore = jest.fn();
    render(<CardBody title="Test" onSeeMore={onSeeMore} />);
    
    fireEvent.click(screen.getByText('See more'));
    expect(onSeeMore).toHaveBeenCalled();
  });
});

describe('Card', () => {
  it('renders CardImage when image is provided', () => {
    const { container } = render(<Card image="test.jpg" title="Test" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders CardBody with title and description', () => {
    render(<Card title="Test Title" description="Test description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders custom children instead of CardBody', () => {
    render(
      <Card title="Test">
        <div data-testid="custom-content">Custom Content</div>
      </Card>
    );
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('renders with card container', () => {
    render(<Card title="Test" />);
    const title = screen.getByText('Test');
    const card = title.parentElement?.parentElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-lg');
  });
});
