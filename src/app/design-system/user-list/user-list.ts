import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { User, UserCard } from '../user-card/user-card';

/**
 * UserList — componente contenedor que consume UserCard.
 * Modela los cuatro estados típicos de una vista que carga datos:
 * loading, error, empty y ready (con datos). Maneja la selección internamente.
 */
@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserCard],
  template: `
    @if (loading()) {
      <div class="user-list__state" aria-busy="true">
        <span class="user-list__spinner"></span>
        <p>Cargando usuarios…</p>
      </div>
    } @else if (error()) {
      <div class="user-list__state user-list__state--error" role="alert">
        <p class="user-list__state-title">No se pudieron cargar los usuarios</p>
        <p class="user-list__state-detail">{{ error() }}</p>
      </div>
    } @else if (isEmpty()) {
      <div class="user-list__state" role="status">
        <p class="user-list__state-title">No hay usuarios para mostrar</p>
        <p class="user-list__state-detail">Probá ajustar los filtros o invitá a alguien.</p>
      </div>
    } @else {
      <div class="user-list" role="list">
        @for (user of users(); track user.id) {
          <app-user-card
            [user]="user"
            [selected]="user.id === selectedId()"
            (cardClick)="select($event)"
          />
        }
      </div>
    }
  `,
  styles: `
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .user-list__state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 48px 24px;
      border: 1px dashed #e5e7eb;
      border-radius: 12px;
      color: #6b7280;
      text-align: center;
    }
    .user-list__state--error {
      border-color: #fecaca;
      background: #fef2f2;
      color: #991b1b;
    }
    .user-list__state-title {
      margin: 0;
      font-weight: 600;
      color: #374151;
    }
    .user-list__state--error .user-list__state-title {
      color: #991b1b;
    }
    .user-list__state-detail {
      margin: 0;
      font-size: 13px;
    }
    .user-list__spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #e5e7eb;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: user-list-spin 0.8s linear infinite;
    }
    @keyframes user-list-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class UserList {
  /** Usuarios a renderizar cuando el estado es "ready". */
  readonly users = input<User[]>([]);

  /** Indica que los datos se están cargando. */
  readonly loading = input(false);

  /** Mensaje de error; si está presente se muestra el estado de error. */
  readonly error = input<string | null>(null);

  /** Se emite al seleccionar un usuario de la lista. */
  readonly userSelected = output<User>();

  protected readonly selectedId = signal<string | null>(null);

  protected readonly isEmpty = computed(
    () => !this.loading() && !this.error() && this.users().length === 0,
  );

  protected select(user: User): void {
    this.selectedId.set(user.id);
    this.userSelected.emit(user);
  }
}
