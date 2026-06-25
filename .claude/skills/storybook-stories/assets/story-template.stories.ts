// Canonical CSF3 story shape for an Angular 20 (zoneless, signals) component.
// Replace `Widget` and its inputs with the real component. Derive EVERYTHING
// from the component .ts — never invent props.
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Widget } from './widget';

const meta: Meta<Widget> = {
  title: 'Design System/Widget',
  component: Widget,
  tags: ['autodocs'],
  args: {
    // shared defaults — one entry per input()
    label: 'Widget',
    variant: 'neutral',
    onChange: fn(), // output(): spy so play functions can assert
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'danger'],
      description: 'Visual variant that signals intent',
      table: { category: 'Appearance', defaultValue: { summary: 'neutral' } },
    },
    label: {
      control: 'text',
      description: 'Visible text',
      table: { category: 'Content' },
    },
    onChange: {
      action: 'onChange',
      control: false, // hide the misleading JSON control for outputs
      description: 'Emitted when the widget changes',
    },
  },
};

export default meta;
type Story = StoryObj<Widget>;

// One story per state. Override only what changes from meta args.
export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };

// Edge case: cover overflow / long content.
export const TextoLargo: Story = {
  args: { label: 'Un texto deliberadamente largo para verificar wrap o truncado' },
};

// Interaction test: stories double as tests via play functions.
export const Interaction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onChange).toHaveBeenCalled();
  },
};
