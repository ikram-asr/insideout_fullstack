import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qst3Component } from './qst3.component';

describe('Qst3Component', () => {
  let component: Qst3Component;
  let fixture: ComponentFixture<Qst3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qst3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qst3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
