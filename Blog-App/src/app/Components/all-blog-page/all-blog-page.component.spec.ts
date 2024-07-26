import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogPageComponent } from './all-blog-page.component';

describe('AllBlogPageComponent', () => {
  let component: AllBlogPageComponent;
  let fixture: ComponentFixture<AllBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBlogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
