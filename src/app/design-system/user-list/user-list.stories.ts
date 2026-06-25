import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { User } from '../user-card/user-card';
import { UserList } from './user-list';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Josefina García',
    email: 'josefina.garcia@empresa.com',
    role: 'Senior Frontend Developer',
    status: 'active',
    avatarUrl: 'https://i.pravatar.cc/150?u=jose',
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos.lopez@empresa.com',
    role: 'UX Designer',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Ana Torres',
    email: 'ana.torres@empresa.com',
    role: 'Product Manager',
    status: 'pending',
  },
];

const meta: Meta<UserList> = {
  title: 'Design System/UserList',
  component: UserList,
  tags: ['autodocs'],
  args: {
    users: mockUsers,
    loading: false,
    error: null,
    userSelected: fn(),
  },
  argTypes: {
    loading: { control: 'boolean', description: 'Muestra el estado de carga' },
    error: {
      control: 'text',
      description: 'Mensaje de error; si existe muestra el estado de error',
    },
    userSelected: { action: 'userSelected', description: 'Se emite al seleccionar un usuario' },
  },
};

export default meta;
type Story = StoryObj<UserList>;

export const ConDatos: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const ErrorState: Story = {
  args: { error: 'Error de red (500). Reintentá en unos segundos.' },
};

export const Empty: Story = {
  args: { users: [] },
};

// --- Interaction test: seleccionar la primera card ---

export const SeleccionInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [firstCard] = canvas.getAllByRole('listitem');

    await userEvent.click(firstCard);

    await expect(args.userSelected).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    await expect(firstCard).toHaveAttribute('aria-selected', 'true');
  },
};
