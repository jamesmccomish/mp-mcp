import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DivisionLobbyBar } from './DivisionLobbyBar';

describe('DivisionLobbyBar', () => {
  it('renders both lobbies with their counts', () => {
    render(<DivisionLobbyBar ayes={324} noes={198} />);
    expect(screen.getByText('324')).toBeInTheDocument();
    expect(screen.getByText('198')).toBeInTheDocument();
    expect(screen.getByText('Ayes')).toBeInTheDocument();
    expect(screen.getByText('Noes')).toBeInTheDocument();
  });

  it('captions the member lobby when memberVote is given', () => {
    render(
      <DivisionLobbyBar ayes={10} noes={5} memberVote={{ name: 'Stella Creasy', vote: 'aye' }} />,
    );
    expect(screen.getByText('Stella Creasy voted Aye')).toBeInTheDocument();
  });

  it('captions the member lobby when memberVote is no', () => {
    render(
      <DivisionLobbyBar ayes={10} noes={5} memberVote={{ name: 'Rishi Sunak', vote: 'no' }} />,
    );
    expect(screen.getByText('Rishi Sunak voted No')).toBeInTheDocument();
  });
});
