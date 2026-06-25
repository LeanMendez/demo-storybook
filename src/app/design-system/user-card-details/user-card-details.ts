import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Badge, BadgeVariant } from '../badge/badge';
import { User, UserStatus } from '../user-card/user-card';

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

@Component({
  selector: 'app-user-card-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge],
  templateUrl: './user-card-details.html',
  styleUrl: './user-card-details.scss',
})
export class UserCardDetails {
  readonly user = input.required<User>();

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
}
