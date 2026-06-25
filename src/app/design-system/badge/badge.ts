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
  template: `
    <span
      class="badge"
      [class]="classes()"
      [attr.aria-label]="ariaLabel() ?? label()"
      role="status"
    >
      @if (showDot()) {
        <span class="badge__dot"></span>
      }
      {{ label() }}
    </span>
  `,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 9999px;
      font-weight: 500;
      font-family: system-ui, sans-serif;
    }
    .badge--sm {
      padding: 2px 8px;
      font-size: 11px;
    }
    .badge--md {
      padding: 4px 12px;
      font-size: 13px;
    }
    .badge--lg {
      padding: 6px 16px;
      font-size: 15px;
    }
    .badge--success {
      background: #dcfce7;
      color: #166534;
    }
    .badge--warning {
      background: #fef9c3;
      color: #854d0e;
    }
    .badge--error {
      background: #fee2e2;
      color: #991b1b;
    }
    .badge--info {
      background: #dbeafe;
      color: #1e40af;
    }
    .badge--neutral {
      background: #f3f4f6;
      color: #374151;
    }
    .badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
  `,
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
