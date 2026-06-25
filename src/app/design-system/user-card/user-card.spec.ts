import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User, UserCard } from './user-card';

const baseUser: User = {
  id: '1',
  name: 'Josefina García',
  email: 'josefina.garcia@empresa.com',
  role: 'Senior Frontend Developer',
  status: 'active',
};

describe('UserCard', () => {
  let fixture: ComponentFixture<UserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCard);
    fixture.componentRef.setInput('user', baseUser);
  });

  it('renders name and email', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.user-card__name')?.textContent).toContain('Josefina García');
    expect(el.querySelector('.user-card__email')?.textContent).toContain(
      'josefina.garcia@empresa.com',
    );
  });

  it('shows initials when there is no avatar', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-card__initials')?.textContent).toContain(
      'JG',
    );
  });

  it('renders the avatar image when avatarUrl is set', () => {
    fixture.componentRef.setInput('user', { ...baseUser, avatarUrl: 'https://x/y.png' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-card__img')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.user-card__initials')).toBeNull();
  });

  it('hides the role in compact mode', () => {
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-card__role')).toBeNull();
  });

  it('emits cardClick with the user on click', () => {
    const emitted: User[] = [];
    fixture.componentInstance.cardClick.subscribe((u) => emitted.push(u));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.user-card') as HTMLElement).click();
    expect(emitted).toEqual([baseUser]);
  });
});
