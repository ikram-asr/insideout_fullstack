import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qst2Component } from './qst2.component';

describe('Qst2Component', () => {
  let component: Qst2Component;
  let fixture: ComponentFixture<Qst2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qst2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qst2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
