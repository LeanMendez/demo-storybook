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
      description: 'Variante visual que indica el tipo de estado',
      table: { defaultValue: { summary: 'neutral' }, category: 'Apariencia' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del badge',
      table: { defaultValue: { summary: 'md' }, category: 'Apariencia' },
    },
    showDot: {
      control: 'boolean',
      description: 'Muestra un indicador dot junto al texto',
      table: { category: 'Apariencia' },
    },
    label: {
      control: 'text',
      description: 'Texto del badge',
      table: { category: 'Contenido' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Label de accesibilidad (cae a `label` si no se define)',
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
