import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MapPopover } from './MapPopover';

describe('MapPopover', () => {
  it('shows a blank constituency map when no constituencies are highlighted', () => {
    render(<MapPopover open onClose={() => {}} highlights={[]} />);

    expect(
      screen.getByRole('img', { name: /map of uk parliamentary constituencies/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/constituencies you ask about light up here/i)).toBeInTheDocument();
  });
});
