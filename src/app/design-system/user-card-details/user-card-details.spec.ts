import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardDetails } from './user-card-details';
import { User } from '../user-card/user-card';

const MOCK_USER: User = {
  id: '1',
  name: 'Ana Torres',
  email: 'ana@empresa.com',
  role: 'Product Manager',
  status: 'active',
};

describe('UserCardDetails', () => {
  let fixture: ComponentFixture<UserCardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardDetails],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCardDetails);
    fixture.componentRef.setInput('user', MOCK_USER);
  });

  it('renders the user name', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.user-details__name')?.textContent?.trim()).toBe('Ana Torres');
  });

  it('renders email and role fields', () => {
    fixture.detectChanges();
    const dds = fixture.nativeElement.querySelectorAll('.user-details__field dd');
    expect(dds[0]?.textContent?.trim()).toBe('ana@empresa.com');
    expect(dds[1]?.textContent?.trim()).toBe('Product Manager');
  });

  it('shows initials when no avatar', () => {
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.user-details__initials')?.textContent?.trim(),
    ).toBe('AT');
  });

  it('shows a status badge', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-badge')).not.toBeNull();
  });

  it('renders an img when avatarUrl is set', () => {
    fixture.componentRef.setInput('user', { ...MOCK_USER, avatarUrl: 'https://x/y.png' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-details__img')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.user-details__initials')).toBeNull();
  });
});
