import type { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from 'storybook/test';
import { User } from '../user-card/user-card';
import { UserCardDetails } from './user-card-details';

const mockUser: User = {
  id: '1',
  name: 'Josefina García',
  email: 'josefina.garcia@empresa.com',
  role: 'Senior Frontend Developer',
  status: 'active',
  avatarUrl: 'https://i.pravatar.cc/150?u=jose',
};

const meta: Meta<UserCardDetails> = {
  title: 'Design System/UserCardDetails',
  component: UserCardDetails,
  tags: ['autodocs'],
  args: {
    user: mockUser,
  },
  argTypes: {
    user: {
      control: false,
      description: 'Datos del usuario a mostrar en detalle',
      table: { category: 'Datos' },
    },
  },
};

export default meta;
type Story = StoryObj<UserCardDetails>;

// --- Estados ---

export const Default: Story = {};

export const UsuarioActivo: Story = {
  args: { user: { ...mockUser, status: 'active' } },
};

export const UsuarioInactivo: Story = {
  args: { user: { ...mockUser, status: 'inactive', name: 'Carlos López' } },
};

export const UsuarioPendiente: Story = {
  args: { user: { ...mockUser, status: 'pending', name: 'Ana Torres' } },
};

// --- Avatar ---

export const SinAvatar: Story = {
  args: { user: { ...mockUser, avatarUrl: undefined } },
};

export const ConAvatar: Story = {
  args: { user: mockUser },
};

// --- Edge cases ---

export const NombreLargo: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Josefina Guadalupe Fernández de las Casas y Rodríguez',
      email: 'josefina.guadalupe.fernandez.casas@empresamuygrande.com.ar',
      role: 'Principal Staff Software Engineer & Architecture Lead',
    },
  },
};

export const EmailLargo: Story = {
  args: {
    user: {
      ...mockUser,
      email: 'un.email.extremadamente.largo.para.verificar.overflow@empresa-con-nombre-largo.com.ar',
    },
  },
};

// --- Interaction test ---

export const VerificaContenido: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Josefina García')).toBeTruthy();
    await expect(canvas.getByText('josefina.garcia@empresa.com')).toBeTruthy();
    await expect(canvas.getByText('Senior Frontend Developer')).toBeTruthy();
    await expect(canvas.getByRole('status')).toBeTruthy();
  },
};
