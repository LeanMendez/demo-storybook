import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { User } from './design-system/user-card/user-card';
import { UserList } from './design-system/user-list/user-list';

type DemoState = 'ready' | 'loading' | 'empty' | 'error';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Josefina García',
    email: 'josefina.garcia@empresa.com',
    role: 'Senior Frontend Developer',
    status: 'active',
    avatarUrl: 'https://i.pravatar.cc/150?u=jose',
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos.lopez@empresa.com',
    role: 'UX Designer',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Ana Torres',
    email: 'ana.torres@empresa.com',
    role: 'Product Manager',
    status: 'pending',
  },
];

const DEMO_STATES: readonly DemoState[] = ['ready', 'loading', 'empty', 'error'];

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Design System Demo');
  protected readonly states = DEMO_STATES;
  protected readonly state = signal<DemoState>('ready');
  protected readonly selected = signal<User | null>(null);

  protected readonly users = computed(() => (this.state() === 'ready' ? MOCK_USERS : []));
  protected readonly loading = computed(() => this.state() === 'loading');
  protected readonly error = computed(() =>
    this.state() === 'error' ? 'Error de red (500). Reintentá en unos segundos.' : null,
  );

  protected setState(state: DemoState): void {
    this.state.set(state);
    this.selected.set(null);
  }

  protected onUserSelected(user: User): void {
    this.selected.set(user);
  }
}
