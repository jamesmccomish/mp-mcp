import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('shows the map badge count when constituencies are in context', () => {
    render(
      <TopBar
        keyPresent
        mapBadge={2}
        mapOpen={false}
        onToggleMap={() => {}}
        plainEnglish={false}
        onTogglePlainEnglish={() => {}}
      />,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('fires onToggleMap when the map button is clicked', () => {
    const onToggleMap = vi.fn();
    render(
      <TopBar
        keyPresent
        mapBadge={0}
        mapOpen={false}
        onToggleMap={onToggleMap}
        plainEnglish={false}
        onTogglePlainEnglish={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /map/i }));
    expect(onToggleMap).toHaveBeenCalledOnce();
  });
});
