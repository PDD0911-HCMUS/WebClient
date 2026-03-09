import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';
import { MatPaginator } from '@angular/material/paginator';

type ChatRole = 'user' | 'assistant';
type Triplet = { subject: string; relation: string; object: string };

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  triplets?: Triplet[];
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
    if (!x.every(t => t && typeof t.subject === 'string' && typeof t.relation === 'string' && typeof t.object === 'string')) {
      return null;
    }
    return x as Triplet[];
  } catch {
    return null;
  }
}

@Component({
  selector: 'app-retrieval-raginteract-ir',
  templateUrl: './retrieval-raginteract-ir.component.html',
  styleUrl: './retrieval-raginteract-ir.component.scss'
})

export class RetrievalRAGInteractIRComponent {

  dataRespone: any;
  conversation_id: any;

  messages: ChatMessage[] = [];

  messages_user: any;
  inputText = '';

  @ViewChild('chatBody') chatBody?: ElementRef<HTMLDivElement>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {

    this.onNewChat();

  }

  onCreate(): void {

  }

  async onSend(): Promise<void> {
    console.log(this.conversation_id);

    const content = (this.inputText ?? '').trim();
    if (!content) return;

    // 1) optimistic add user message
    this.messages = [
      ...this.messages,
      {
        id: uid(),
        role: 'user',
        content,
        createdAt: Date.now(),
      },
    ];

    // clear input
    this.inputText = '';
    this.messages_user = content;

    setTimeout(() => this.scrollChatToBottom(), 0);

    // 2) call API
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

      // 3) parse triplets from answer (answer is JSON string)
      const triplets = safeParseTriplets(resp?.answer);

      // 4) add assistant message
      this.messages = [
        ...this.messages,
        {
          id: uid(),
          role: 'assistant',
          content: triplets
            ? 'I extracted editable triplets below.'
            : (resp?.answer ?? ''),
          triplets: triplets ?? undefined,
          createdAt: Date.now(),
        },
      ];

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

      // Optional: update URL with path param (recommended)
      // await this.router.navigate(
      //   ['/retrieval/retrieval-RAGInterIR', this.conversation_id],
      //   { replaceUrl: true }
      // );

      this.messages = [
        {
          id: uid(),
          role: 'assistant',
          content: String(resp?.caption ?? 'New conversation started.'),
          createdAt: Date.now(),
        },
      ];

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

  applyTriplets(m: ChatMessage): void {
    if (!m.triplets?.length) return;

    // Option A: biến thành text query để gửi lại backend
    const structured = m.triplets
      .map(t => `(${t.subject}, ${t.relation}, ${t.object})`)
      .join('; ');

    // đẩy sang inputText hoặc gửi luôn API refine
    this.inputText = structured;

    // hoặc gọi lại onUserSend() luôn nếu bạn muốn
    // this.onUserSend();
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
