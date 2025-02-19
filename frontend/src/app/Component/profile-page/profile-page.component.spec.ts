import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a valid review', () => {
    component.reviewForm.setValue({ rating: 5, comment: 'Great trip!' });
    component.submitReview();

    expect(component.reviews.length).toBe(1);
    expect(component.reviews[0].rating).toBe(5);
    expect(component.reviews[0].comment).toBe('Great trip!');
  });

  it('should reset form after review submission', () => {
    component.reviewForm.setValue({ rating: 4, comment: 'Nice experience!' });
    component.submitReview();

    expect(component.reviewForm.value.rating).toBe(0);
    expect(component.reviewForm.value.comment).toBe('');
  });

  it('should not submit an invalid review', () => {
    component.reviewForm.setValue({ rating: 6, comment: '' }); // Invalid rating & empty comment
    component.submitReview();

    expect(component.reviews.length).toBe(0); // Should not add invalid reviews
  });

  it('should handle multiple reviews', () => {
    component.reviewForm.setValue({ rating: 5, comment: 'First review!' });
    component.submitReview();

    component.reviewForm.setValue({ rating: 4, comment: 'Second review!' });
    component.submitReview();

    expect(component.reviews.length).toBe(2);
    expect(component.reviews[1].comment).toBe('Second review!');
  });
});
