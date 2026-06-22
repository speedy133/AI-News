import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ArticleCard from '../ArticleCard';

const mockArticle = {
  id: '123',
  title: 'Anthropic releases new model',
  source: 'The Verge',
  url: 'https://example.com/anthropic',
  image_url: null,
  published_at: new Date().toISOString()
};

test('renders ArticleCard with title and source', () => {
  render(<ArticleCard article={mockArticle} isSaved={false} />);
  expect(screen.getByText('Anthropic releases new model')).toBeInTheDocument();
  // Check if source appears
  expect(screen.getAllByText('The Verge').length).toBeGreaterThan(0);
});

test('save button displays correct state', () => {
  const { rerender } = render(<ArticleCard article={mockArticle} isSaved={false} />);
  expect(screen.getByText('Save for later')).toBeInTheDocument();

  rerender(<ArticleCard article={mockArticle} isSaved={true} />);
  expect(screen.getByText('Saved')).toBeInTheDocument();
});
