import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardGrid } from '../components/CardGrid';

describe('CardGrid', () => {
  it('renders children', () => {
    render(
      <CardGrid>
        <div>Child 1</div>
        <div>Child 2</div>
      </CardGrid>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders with grid container', () => {
    render(<CardGrid><div>Test</div></CardGrid>);
    const grid = screen.getByText('Test').parentElement;
    expect(grid).toHaveClass('grid');
  });

  it('renders with custom column count', () => {
    render(<CardGrid columns={3}><div>Test</div></CardGrid>);
    const grid = screen.getByText('Test').parentElement;
    expect(grid).toHaveClass('grid-cols-3');
  });

  it('renders with 2 columns', () => {
    render(<CardGrid columns={2}><div>Test</div></CardGrid>);
    const grid = screen.getByText('Test').parentElement;
    expect(grid).toHaveClass('grid-cols-2');
  });

  it('renders with 6 columns', () => {
    render(<CardGrid columns={6}><div>Test</div></CardGrid>);
    const grid = screen.getByText('Test').parentElement;
    expect(grid).toHaveClass('grid-cols-6');
  });
});
