import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../user-card/user-card';
import { UserList } from './user-list';

const users: User[] = [
  { id: '1', name: 'Josefina García', email: 'm@e.com', role: 'Dev', status: 'active' },
  { id: '2', name: 'Carlos López', email: 'c@e.com', role: 'UX', status: 'inactive' },
];

describe('UserList', () => {
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(UserList);
  });

  const html = () => fixture.nativeElement as HTMLElement;

  it('shows the loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(html().querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(html().querySelectorAll('app-user-card').length).toBe(0);
  });

  it('shows the error state', () => {
    fixture.componentRef.setInput('error', 'boom');
    fixture.detectChanges();
    expect(html().querySelector('[role="alert"]')?.textContent).toContain('boom');
  });

  it('shows the empty state when there are no users', () => {
    fixture.componentRef.setInput('users', []);
    fixture.detectChanges();
    expect(html().textContent).toContain('No hay usuarios');
  });

  it('renders one card per user when ready', () => {
    fixture.componentRef.setInput('users', users);
    fixture.detectChanges();
    expect(html().querySelectorAll('app-user-card').length).toBe(2);
  });

  it('emits userSelected when a card is clicked', () => {
    const emitted: User[] = [];
    fixture.componentInstance.userSelected.subscribe((u) => emitted.push(u));
    fixture.componentRef.setInput('users', users);
    fixture.detectChanges();
    (html().querySelector('.user-card') as HTMLElement).click();
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('1');
  });
});
