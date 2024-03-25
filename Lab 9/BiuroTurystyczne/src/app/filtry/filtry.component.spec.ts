import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltryComponent } from './filtry.component';

describe('FiltryComponent', () => {
  let component: FiltryComponent;
  let fixture: ComponentFixture<FiltryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
