import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { User, UserCard } from './user-card';

const mockUser: User = {
  id: '1',
  name: 'Josefina García',
  email: 'josefina.garcia@empresa.com',
  role: 'Senior Frontend Developer',
  status: 'active',
};

const meta: Meta<UserCard> = {
  title: 'Design System/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  args: {
    user: mockUser,
    selected: false,
    compact: false,
    cardClick: fn(),
  },
  argTypes: {
    user: {
      control: false,
      description: 'Objeto `User` con los datos a mostrar (nombre, email, rol, status, avatar).',
      table: { category: 'Datos' },
    },
    selected: {
      control: 'boolean',
      description:
        'Resalta la card con borde azul y fondo claro. Controlado por el componente padre (UserList) al hacer click.',
      table: { defaultValue: { summary: 'false' }, category: 'Estado' },
    },
    compact: {
      control: 'boolean',
      description:
        'Reduce padding y oculta el rol del usuario. Útil en sidebars o listas densas donde el espacio es limitado.',
      table: { defaultValue: { summary: 'false' }, category: 'Apariencia' },
    },
    cardClick: {
      action: 'cardClick',
      control: false,
      description:
        'Se emite con el objeto `User` al hacer click, Enter o Espacio sobre la card. El padre lo usa para manejar la selección.',
      table: { category: 'Eventos' },
    },
  },
};

export default meta;
type Story = StoryObj<UserCard>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Compact: Story = {
  args: { compact: true },
};

export const UsuarioInactivo: Story = {
  args: { user: { ...mockUser, status: 'inactive', name: 'Carlos López' } },
};

export const UsuarioPendiente: Story = {
  args: { user: { ...mockUser, status: 'pending', name: 'Ana Torres' } },
};

export const SinAvatar: Story = {
  args: { user: { ...mockUser, avatarUrl: undefined } },
};

export const ConAvatar: Story = {
  args: { user: { ...mockUser, avatarUrl: 'https://i.pravatar.cc/150?u=jose' } },
};

export const NombreLargo: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Josefina Guadalupe Fernández de las Casas y Rodríguez',
      email: 'josefina.guadalupe.fernandez.casas@empresamuygrande.com.ar',
    },
  },
};

// --- Interaction test ---

export const ClickInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('listitem');

    await userEvent.click(card);

    await expect(args.cardClick).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
  },
};
