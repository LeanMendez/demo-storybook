import type { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from 'storybook/test';
import { User } from '../user-card/user-card';
import { UserCardDetails } from './user-card-details';

const defaultUser: User = {
  id: 'usr-001',
  name: 'Josefina López',
  email: 'josefina@example.com',
  role: 'Admin',
  status: 'active',
  avatarUrl: 'https://i.pravatar.cc/150?u=josefina',
};

const meta: Meta<UserCardDetails> = {
  title: 'Design System/UserCardDetails',
  component: UserCardDetails,
  tags: ['autodocs'],
  args: {
    user: defaultUser,
  },
  argTypes: {
    user: {
      control: false,
      description:
        'Objeto User completo. Incluye id, name, email, role, status y avatarUrl (opcional).',
      table: { category: 'Datos' },
    },
  },
};

export default meta;
type Story = StoryObj<UserCardDetails>;

// --- Default ---

export const Default: Story = {};

// --- Estados de usuario ---

export const Activo: Story = {
  args: { user: { ...defaultUser, status: 'active' } },
};

export const Inactivo: Story = {
  args: { user: { ...defaultUser, status: 'inactive', name: 'Carlos Ruiz' } },
};

export const Pendiente: Story = {
  args: { user: { ...defaultUser, status: 'pending', name: 'Ana Martínez' } },
};

// --- Avatar vs iniciales ---

export const SinAvatar: Story = {
  args: {
    user: { ...defaultUser, avatarUrl: undefined },
  },
};

export const ConAvatar: Story = {
  args: {
    user: { ...defaultUser, avatarUrl: 'https://i.pravatar.cc/150?u=avatar-test' },
  },
};

// --- Edge cases ---

export const NombreLargo: Story = {
  args: {
    user: {
      ...defaultUser,
      name: 'María Valentina de los Ángeles Fernández Gutiérrez',
      email: 'maria.valentina.fernandez.gutierrez@empresa-con-nombre-largo.com.ar',
      avatarUrl: undefined,
    },
  },
};

export const RolLargo: Story = {
  args: {
    user: {
      ...defaultUser,
      role: 'Senior Staff Engineering Manager & Technical Lead',
    },
  },
};

// --- Interaction tests ---

export const MuestraIniciales: Story = {
  args: {
    user: { ...defaultUser, avatarUrl: undefined, name: 'Josefina López' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getByText('JL');
    await expect(initials).toBeVisible();
  },
};

export const MuestraDatos: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Josefina López')).toBeVisible();
    await expect(canvas.getByText('josefina@example.com')).toBeVisible();
    await expect(canvas.getByText('Admin')).toBeVisible();
    await expect(canvas.getByText('usr-001')).toBeVisible();
  },
};
