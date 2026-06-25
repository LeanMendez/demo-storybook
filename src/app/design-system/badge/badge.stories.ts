import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Badge } from './badge';

const meta: Meta<Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    label: 'Badge',
    variant: 'neutral',
    size: 'md',
    showDot: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
      description:
        'Color semántico del badge. Usá `success` para estados positivos (activo, aprobado), `warning` para pendientes, `error` para fallos, `info` para novedades y `neutral` como default sin semántica.',
      table: { defaultValue: { summary: 'neutral' }, category: 'Apariencia' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description:
        'Escala del badge. `sm` para uso inline junto a títulos o dentro de cards, `md` como tamaño general, `lg` para badges destacados o hero sections.',
      table: { defaultValue: { summary: 'md' }, category: 'Apariencia' },
    },
    showDot: {
      control: 'boolean',
      description:
        'Agrega un círculo de color antes del texto para reforzar visualmente el estado. Recomendado cuando el badge se usa sin contexto adicional.',
      table: { defaultValue: { summary: 'false' }, category: 'Apariencia' },
    },
    label: {
      control: 'text',
      description: 'Texto visible del badge. Mantenerlo corto (1-3 palabras) para no romper el layout.',
      table: { defaultValue: { summary: 'Badge' }, category: 'Contenido' },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Override del texto que leen los screen readers. Si no se define, se usa el valor de `label`. Útil cuando el label visual es una abreviatura o ícono.',
      table: { category: 'Accesibilidad' },
    },
  },
};

export default meta;
type Story = StoryObj<Badge>;

// --- Variantes ---

export const Default: Story = {};

export const Success: Story = {
  args: { label: 'Activo', variant: 'success', showDot: true },
};

export const Warning: Story = {
  args: { label: 'Pendiente', variant: 'warning', showDot: true },
};

export const ErrorState: Story = {
  args: { label: 'Error', variant: 'error', showDot: true },
};

export const Info: Story = {
  args: { label: 'Nuevo', variant: 'info' },
};

// --- Tamaños ---

export const Small: Story = {
  args: { label: 'Pequeño', size: 'sm', variant: 'info' },
};

export const Large: Story = {
  args: { label: 'Grande', size: 'lg', variant: 'success', showDot: true },
};

// --- Edge cases ---

export const TextoLargo: Story = {
  args: {
    label: 'Este es un texto extremadamente largo para un badge',
    variant: 'error',
  },
};

export const TodasLasVariantes: Story = {
  decorators: [moduleMetadata({ imports: [Badge] })],
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <app-badge label="Success" variant="success" [showDot]="true" />
        <app-badge label="Warning" variant="warning" [showDot]="true" />
        <app-badge label="Error" variant="error" [showDot]="true" />
        <app-badge label="Info" variant="info" />
        <app-badge label="Neutral" variant="neutral" />
      </div>
    `,
  }),
};
