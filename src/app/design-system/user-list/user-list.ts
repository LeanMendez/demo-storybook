import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { User, UserCard } from '../user-card/user-card';

/**
 * UserList — componente contenedor que consume UserCard.
 * Modela los cuatro estados típicos de una vista que carga datos:
 * loading, error, empty y ready (con datos). Maneja la selección internamente.
 */
@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserCard],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  /** Usuarios a renderizar cuando el estado es "ready". */
  readonly users = input<User[]>([]);

  /** Indica que los datos se están cargando. */
  readonly loading = input(false);

  /** Mensaje de error; si está presente se muestra el estado de error. */
  readonly error = input<string | null>(null);

  /** Se emite al seleccionar un usuario de la lista. */
  readonly userSelected = output<User>();

  protected readonly selectedId = signal<string | null>(null);

  protected readonly isEmpty = computed(
    () => !this.loading() && !this.error() && this.users().length === 0,
  );

  protected select(user: User): void {
    this.selectedId.set(user.id);
    this.userSelected.emit(user);
  }
}
