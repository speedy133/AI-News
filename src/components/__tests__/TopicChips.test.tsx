import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import TopicChips from '../TopicChips';

const mockTopics = [
  { id: '1', slug: 'agents', label: 'Agents' },
  { id: '2', slug: 'models', label: 'Models' }
];

test('renders All Feed chip and topic chips', () => {
  render(<TopicChips topics={mockTopics} />);
  expect(screen.getByText('All Feed')).toBeInTheDocument();
  expect(screen.getByText('Agents')).toBeInTheDocument();
  expect(screen.getByText('Models')).toBeInTheDocument();
});

test('highlights selected chip', () => {
  render(<TopicChips topics={mockTopics} selectedSlug="agents" />);
  const allFeedChip = screen.getByText('All Feed');
  const agentsChip = screen.getByText('Agents');
  
  // 'All Feed' should not be active (meaning it has 'glass' class, not 'bg-primary')
  expect(allFeedChip).toHaveClass('glass');
  // 'Agents' should be active
  expect(agentsChip).toHaveClass('bg-primary');
});
