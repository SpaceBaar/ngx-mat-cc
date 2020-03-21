import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCcComponent } from './ngx-mat-cc.component';

describe('NgxMatCcComponent', () => {
  let component: NgxMatCcComponent;
  let fixture: ComponentFixture<NgxMatCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
