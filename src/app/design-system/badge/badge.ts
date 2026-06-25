import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge — componente atómico del design system.
 * Muestra un estado breve con variante de color, tamaño y un dot opcional.
 */
@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  /** Texto que muestra el badge. */
  readonly label = input('Badge');

  /** Variante visual que indica el tipo de estado. */
  readonly variant = input<BadgeVariant>('neutral');

  /** Tamaño del badge. */
  readonly size = input<BadgeSize>('md');

  /** Muestra un dot indicador antes del texto. */
  readonly showDot = input(false);

  /** Label de accesibilidad personalizado (cae a `label` si no se define). */
  readonly ariaLabel = input<string>();

  protected readonly classes = computed(() => `badge--${this.variant()} badge--${this.size()}`);
}
