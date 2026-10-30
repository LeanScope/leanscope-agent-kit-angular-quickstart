import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Step } from '../agent-server.types';

interface Message {
  guid: string;
  fromUser: boolean;
  author: string;
  text: string;
}

/** The conversation of a session: agent and user messages, oldest first. */
@Component({
  selector: 'ls-transcript',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (message of messages(); track message.guid) {
      <article class="message" [class.from-user]="message.fromUser">
        <header>{{ message.author }}</header>
        <p>{{ message.text }}</p>
      </article>
    } @empty {
      <p class="empty">No messages yet.</p>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .message {
      max-width: 80%;
      padding: 0.6rem 0.9rem;
      border-radius: 0.75rem;
      background: var(--ls-surface);
    }
    .message.from-user {
      align-self: flex-end;
      background: var(--ls-accent-soft);
    }
    header {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ls-muted);
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    .empty {
      color: var(--ls-muted);
    }
  `,
})
export class Transcript {
  readonly steps = input.required<Step[]>();
  /** The step that waits for an answer; it is shown as the form, not as a message. */
  readonly pendingGuid = input<string | null>(null);

  protected readonly messages = computed<Message[]>(() =>
    this.steps()
      .filter((step) => step.guid !== this.pendingGuid() && !step.pending && step.line?.trim())
      .map((step) => {
        const fromUser = step.actorSymbolRef === 'human';
        return {
          guid: step.guid,
          fromUser,
          author: fromUser ? 'You' : step.title?.trim() || step.actorSymbolRef || 'Agent',
          text: fromUser ? answerText(step.line) : step.line,
        };
      }),
  );
}

/** A user step's line is the submitted answer as JSON; show it as text. */
function answerText(line: string): string {
  try {
    const answer = JSON.parse(line) as unknown;
    if (answer && typeof answer === 'object' && !Array.isArray(answer)) {
      const entries = Object.entries(answer as Record<string, unknown>);
      if (entries.length === 1 && entries[0][0] === 'message') return String(entries[0][1]);
      return entries
        .map(
          ([key, value]) => `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`,
        )
        .join('\n');
    }
    return typeof answer === 'string' ? answer : line;
  } catch {
    return line;
  }
}
