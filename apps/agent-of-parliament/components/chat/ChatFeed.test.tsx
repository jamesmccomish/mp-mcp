import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChatFeed } from './ChatFeed';

const noop = () => {};

describe('ChatFeed', () => {
  it('shows sample prompts and the greeting when empty', () => {
    render(
      <ChatFeed
        history={[]}
        streaming={false}
        toolTrace={[]}
        samplePrompts={['Tell me about my MP']}
        input=""
        onInput={noop}
        onSubmit={noop}
        onPromptClick={noop}
      />,
    );
    expect(screen.getByText('Ask Parliament a question.')).toBeInTheDocument();
    expect(screen.getByText('Tell me about my MP')).toBeInTheDocument();
  });

  it('renders user and assistant turns', () => {
    render(
      <ChatFeed
        history={[
          { role: 'user', content: 'Who is my MP?' },
          { role: 'assistant', content: 'Here is your MP.' },
        ]}
        streaming={false}
        toolTrace={[]}
        samplePrompts={[]}
        input=""
        onInput={noop}
        onSubmit={noop}
        onPromptClick={noop}
      />,
    );
    expect(screen.getByText('Who is my MP?')).toBeInTheDocument();
    expect(screen.getByText('Here is your MP.')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
  });

  it('fires onPromptClick when a chip is clicked', () => {
    const onPromptClick = vi.fn();
    render(
      <ChatFeed
        history={[]}
        streaming={false}
        toolTrace={[]}
        samplePrompts={['Recent debates about Ukraine']}
        input=""
        onInput={noop}
        onSubmit={noop}
        onPromptClick={onPromptClick}
      />,
    );
    fireEvent.click(screen.getByText('Recent debates about Ukraine'));
    expect(onPromptClick).toHaveBeenCalledWith('Recent debates about Ukraine');
  });
});
