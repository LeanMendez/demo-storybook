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
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
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
