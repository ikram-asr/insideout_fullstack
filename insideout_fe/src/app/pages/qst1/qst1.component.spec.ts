import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qst1Component } from './qst1.component';

describe('Qst1Component', () => {
  let component: Qst1Component;
  let fixture: ComponentFixture<Qst1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qst1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qst1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
