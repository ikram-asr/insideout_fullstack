import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealprogrammsComponent } from './realprogramms.component';

describe('RealprogrammsComponent', () => {
  let component: RealprogrammsComponent;
  let fixture: ComponentFixture<RealprogrammsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealprogrammsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealprogrammsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
