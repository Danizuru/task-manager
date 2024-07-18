import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarComponent } from './activar.component';

describe('ActivarComponent', () => {
  let component: ActivarComponent;
  let fixture: ComponentFixture<ActivarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivarComponent]
    });
    fixture = TestBed.createComponent(ActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
