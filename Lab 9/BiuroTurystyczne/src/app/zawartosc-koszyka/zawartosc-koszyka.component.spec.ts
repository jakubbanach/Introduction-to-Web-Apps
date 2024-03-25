import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZawartoscKoszykaComponent } from './zawartosc-koszyka.component';

describe('ZawartoscKoszykaComponent', () => {
  let component: ZawartoscKoszykaComponent;
  let fixture: ComponentFixture<ZawartoscKoszykaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZawartoscKoszykaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZawartoscKoszykaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
