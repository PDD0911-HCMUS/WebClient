import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import { AppSwal } from '../../services/app.swals';

type ChatRole = 'user' | 'assistant';

type Triplet = {
  subject: string;
  relation: string;
  object: string;
};

type SuggestionItem = {
  sug: string;
  explain: string;
  triplets: Triplet[];
  accepted?: boolean;
};

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  triplets?: Triplet[];
  suggestions?: SuggestionItem[];
  createdAt: number;
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeParseTriplets(answer: any): Triplet[] | null {
  if (!answer || typeof answer !== 'string') return null;

  try {
    const x = JSON.parse(answer);

    if (!Array.isArray(x)) return null;

    const isValid = x.every(
      (t) =>
        t &&
        typeof t.subject === 'string' &&
        typeof t.relation === 'string' &&
        typeof t.object === 'string'
    );

    if (!isValid) return null;

    return x as Triplet[];
  } catch {
    return null;
  }
}

function safeParseSuggestions(data: any): SuggestionItem[] | null {
  if (!Array.isArray(data)) return null;

  try {
    const suggestions: SuggestionItem[] = data.map((item: any) => {
      const parsedTriplets = safeParseTriplets(item?.triplet) ?? [];

      return {
        sug: String(item?.sug ?? ''),
        explain: String(item?.explain ?? ''),
        triplets: parsedTriplets,
        accepted: false,
      };
    });

    return suggestions.length ? suggestions : null;
  } catch {
    return null;
  }
}

@Component({
  selector: 'app-retrieval-raginteract-ir',
  templateUrl: './retrieval-raginteract-ir.component.html',
  styleUrl: './retrieval-raginteract-ir.component.scss',
})
export class RetrievalRAGInteractIRComponent {
  apiRoot: any;

  dataRespone: any;
  conversation_id: any;

  messages: ChatMessage[] = [];

  messages_user: any;
  inputText = '';

  imageUrls: string[] = [];
  captionRev: string[] = [];

  @ViewChild('chatBody') chatBody?: ElementRef<HTMLDivElement>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {
    this.onNewChat();
    this.apiRoot = appService.apiRoot;
  }

  onCreate(): void { }

  async onSend(): Promise<void> {
    console.log(this.conversation_id);

    const content = (this.inputText ?? '').trim();
    if (!content) return;

    this.messages = [
      ...this.messages,
      {
        id: uid(),
        role: 'user',
        content,
        createdAt: Date.now(),
      },
    ];

    this.inputText = '';
    this.messages_user = content;

    setTimeout(() => this.scrollChatToBottom(), 0);

    const body = { message: this.messages_user };

    try {
      const resp: any = await firstValueFrom(
        this.appService.doPOST(
          `api/v1/vlm/conversations/${this.conversation_id}/messages`,
          body
        )
      );

      this.dataRespone = resp;
      console.log('POST response:', resp);

      const triplets = safeParseTriplets(resp?.answer);
      const suggestions =
        safeParseSuggestions(resp?.suggest) ??
        safeParseSuggestions(resp?.retrieve?.suggest);

      const assistantContent =
        triplets || suggestions
          ? 'I extracted content below.'
          : String(resp?.answer ?? '');

      this.messages = [
        ...this.messages,
        {
          id: uid(),
          role: 'assistant',
          content: assistantContent,
          triplets: triplets ?? undefined,
          suggestions: suggestions ?? undefined,
          createdAt: Date.now(),
        },
      ];

      this.imageUrls = resp?.retrieve?.id ?? [];
      this.captionRev = resp?.retrieve?.text ?? [];
      this.appSwal.showPopup();

      setTimeout(() => this.scrollChatToBottom(), 0);
    } catch (err) {
      console.error('Send message failed:', err);

      this.messages = [
        ...this.messages,
        {
          id: uid(),
          role: 'assistant',
          content: '⚠️ Failed to process your message.',
          createdAt: Date.now(),
        },
      ];
    }
  }

  async onNewChat(): Promise<void> {
    try {
      const resp: any = await firstValueFrom(
        this.appService.doGET('api/v1/vlm/conversations', null)
      );

      this.dataRespone = resp;
      console.log('GET response:', resp);

      this.conversation_id = resp?.conversation_id;
      console.log('conversation_id:', this.conversation_id);

      this.messages = [
        {
          id: uid(),
          role: 'assistant',
          content: String(resp?.caption ?? 'New conversation started.'),
          createdAt: Date.now(),
        },
      ];

      this.imageUrls = [];
      this.captionRev = [];

      setTimeout(() => this.scrollChatToBottom(), 0);
    } catch (err) {
      console.error('Create new chat failed:', err);
      this.messages = [
        {
          id: uid(),
          role: 'assistant',
          content: '⚠️ Failed to create a new conversation.',
          createdAt: Date.now(),
        },
      ];
    }
  }

  addTriplet(m: ChatMessage): void {
    if (!m.triplets) m.triplets = [];
    m.triplets = [...m.triplets, { subject: '', relation: '', object: '' }];
  }

  removeTriplet(m: ChatMessage, i: number): void {
    if (!m.triplets) return;
    m.triplets = m.triplets.filter((_, idx) => idx !== i);
  }

  private isSameTriplet(a: Triplet, b: Triplet): boolean {
    return (
      (a.subject ?? '').trim().toLowerCase() === (b.subject ?? '').trim().toLowerCase() &&
      (a.relation ?? '').trim().toLowerCase() === (b.relation ?? '').trim().toLowerCase() &&
      (a.object ?? '').trim().toLowerCase() === (b.object ?? '').trim().toLowerCase()
    );
  }

  acceptSuggestion(m: ChatMessage, sIndex: number): void {
    const suggestion = m.suggestions?.[sIndex];
    if (!suggestion) return;

    if (!m.triplets) {
      m.triplets = [];
    }

    for (const st of suggestion.triplets) {
      const exists = m.triplets.some((mt) => this.isSameTriplet(mt, st));
      if (!exists) {
        m.triplets.push({
          subject: st.subject,
          relation: st.relation,
          object: st.object,
        });
      }
    }

    suggestion.accepted = true;
  }

  async applyTriplets(m: ChatMessage): Promise<void> {
    if (!m.triplets?.length) return;

    const structured = m.triplets
      .map((t) => `${t.subject} ${t.relation} ${t.object}`.trim())
      .join('; ');

    this.inputText = structured;

    const body = { message: structured };

    try {
      const r: any = await firstValueFrom(
        this.appService.doPOST(
          `api/v1/vlm/conversations/${this.conversation_id}/faiss`,
          body
        )
      );

      this.dataRespone = r;

      if (this.dataRespone != null) {
        this.imageUrls = this.dataRespone['id'] ?? [];
        this.captionRev = this.dataRespone['text'] ?? [];
        this.appSwal.showPopup();
      } else {
        this.appSwal.showFailure(this.dataRespone?.Msg ?? 'Search failed');
      }
    } catch (err) {
      console.error('Apply triplets failed:', err);
      this.appSwal.showFailure('Apply triplets failed');
    }
  }

  private scrollChatToBottom(): void {
    const el = this.chatBody?.nativeElement;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  trackById(_: number, item: ChatMessage): string {
    return item.id;
  }
}