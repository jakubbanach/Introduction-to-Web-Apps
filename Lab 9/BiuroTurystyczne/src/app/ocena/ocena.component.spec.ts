import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenaComponent } from './ocena.component';

describe('OcenaComponent', () => {
  let component: OcenaComponent;
  let fixture: ComponentFixture<OcenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
