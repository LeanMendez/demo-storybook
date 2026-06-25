import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';

describe('Badge', () => {
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(Badge);
  });

  function span(): HTMLElement {
    return fixture.nativeElement.querySelector('.badge') as HTMLElement;
  }

  it('renders the label', () => {
    fixture.componentRef.setInput('label', 'Activo');
    fixture.detectChanges();
    expect(span().textContent).toContain('Activo');
  });

  it('applies variant and size classes', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(span().classList).toContain('badge--success');
    expect(span().classList).toContain('badge--lg');
  });

  it('shows the dot only when showDot is true', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge__dot')).toBeNull();

    fixture.componentRef.setInput('showDot', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge__dot')).not.toBeNull();
  });

  it('falls back to label for the aria-label', () => {
    fixture.componentRef.setInput('label', 'Nuevo');
    fixture.detectChanges();
    expect(span().getAttribute('aria-label')).toBe('Nuevo');
  });
});
