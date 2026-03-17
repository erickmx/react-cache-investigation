import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from '../components/Dropdown';

const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

describe('DropdownItem', () => {
  it('renders with label', () => {
    const { DropdownItem } = require('../components/DropdownItem');
    render(<DropdownItem label="Test" value="test" onClick={jest.fn()} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick with value when clicked', () => {
    const { DropdownItem } = require('../components/DropdownItem');
    const onClick = jest.fn();
    render(<DropdownItem label="Test" value="test-value" onClick={onClick} />);
    
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalledWith('test-value');
  });

  it('applies active styles when isActive is true', () => {
    const { DropdownItem } = require('../components/DropdownItem');
    render(<DropdownItem label="Test" value="test" onClick={jest.fn()} isActive={true} />);
    expect(screen.getByText('Test')).toHaveClass('bg-gray-100 font-semibold');
  });
});

describe('Dropdown', () => {
  it('renders with label', () => {
    render(
      <Dropdown
        label="Characters"
        options={options}
        onSelect={jest.fn()}
        type="character"
      />
    );
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', () => {
    render(
      <Dropdown
        label="Characters"
        options={options}
        onSelect={jest.fn()}
        type="character"
      />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <Dropdown
        label="Characters"
        options={options}
        onSelect={jest.fn()}
        type="character"
      />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('calls onSelect with value and type when option is clicked', () => {
    const onSelect = jest.fn();
    render(
      <Dropdown
        label="Characters"
        options={options}
        onSelect={onSelect}
        type="character"
      />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(onSelect).toHaveBeenCalledWith('opt2', 'character');
  });

  it('closes dropdown after selection', () => {
    const onSelect = jest.fn();
    render(
      <Dropdown
        label="Characters"
        options={options}
        onSelect={onSelect}
        type="episode"
      />
    );
    
    fireEvent.click(screen.getByText('Characters'));
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
