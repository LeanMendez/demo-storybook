import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Badge, BadgeVariant } from '../badge/badge';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatarUrl?: string;
}

const STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente',
};

const STATUS_VARIANTS: Record<UserStatus, BadgeVariant> = {
  active: 'success',
  inactive: 'neutral',
  pending: 'warning',
};

/**
 * UserCard — componente compuesto que muestra los datos de un usuario
 * y reutiliza Badge para representar su estado.
 */
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge],
  template: `
    <article
      class="user-card"
      [class.user-card--selected]="selected()"
      [class.user-card--compact]="compact()"
      (click)="onCardClick()"
      (keydown)="onKeydown($event)"
      [attr.aria-selected]="selected()"
      role="listitem"
      tabindex="0"
    >
      <div class="user-card__avatar">
        @if (user().avatarUrl) {
          <img [src]="user().avatarUrl" [alt]="user().name" class="user-card__img" />
        } @else {
          <span class="user-card__initials">{{ initials() }}</span>
        }
      </div>

      <div class="user-card__info">
        <h3 class="user-card__name">{{ user().name }}</h3>
        <p class="user-card__email">{{ user().email }}</p>
        @if (!compact()) {
          <p class="user-card__role">{{ user().role }}</p>
        }
      </div>

      <div class="user-card__actions">
        <app-badge [label]="statusLabel()" [variant]="statusVariant()" [showDot]="true" size="sm" />
      </div>
    </article>
  `,
  styles: `
    .user-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      background: white;
    }
    .user-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
    }
    .user-card--selected {
      border-color: #3b82f6;
      background: #eff6ff;
    }
    .user-card--compact {
      padding: 8px 12px;
    }
    .user-card__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-card--compact .user-card__avatar {
      width: 32px;
      height: 32px;
    }
    .user-card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user-card__initials {
      font-weight: 600;
      color: #6b7280;
      font-size: 16px;
    }
    .user-card__info {
      flex: 1;
      min-width: 0;
    }
    .user-card__name {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }
    .user-card__email {
      margin: 2px 0 0;
      font-size: 13px;
      color: #6b7280;
    }
    .user-card__role {
      margin: 2px 0 0;
      font-size: 12px;
      color: #9ca3af;
    }
  `,
})
export class UserCard {
  /** Datos del usuario a mostrar. */
  readonly user = input.required<User>();

  /** Estado de selección de la card. */
  readonly selected = input(false);

  /** Modo compacto (menos padding, sin rol). */
  readonly compact = input(false);

  /** Se emite al hacer click en la card. */
  readonly cardClick = output<User>();

  protected readonly initials = computed(() =>
    this.user()
      .name.split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
  );

  protected readonly statusLabel = computed(() => STATUS_LABELS[this.user().status]);

  protected readonly statusVariant = computed(() => STATUS_VARIANTS[this.user().status]);

  protected onCardClick(): void {
    this.cardClick.emit(this.user());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onCardClick();
    }
  }
}
