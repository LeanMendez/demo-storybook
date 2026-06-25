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
    users: {
      control: false,
      description:
        'Array de objetos `User` a renderizar. Cuando está vacío (y no hay loading ni error) se muestra el estado empty.',
      table: { category: 'Datos' },
    },
    loading: {
      control: 'boolean',
      description:
        'Muestra un spinner con mensaje de carga. Tiene prioridad sobre los demás estados: si es `true`, no se muestran ni error ni la lista.',
      table: { defaultValue: { summary: 'false' }, category: 'Estado' },
    },
    error: {
      control: 'text',
      description:
        'Mensaje de error a mostrar. Si tiene valor (y `loading` es false), se muestra un banner de error en lugar de la lista.',
      table: { defaultValue: { summary: 'null' }, category: 'Estado' },
    },
    userSelected: {
      action: 'userSelected',
      control: false,
      description:
        'Se emite con el objeto `User` cuando se hace click en una card. El consumidor puede usarlo para mostrar un detalle o navegar.',
      table: { category: 'Eventos' },
    },
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
