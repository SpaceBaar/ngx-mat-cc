import { TestBed } from '@angular/core/testing';

import { NgxMatCcService } from './ngx-mat-cc.service';

describe('NgxMatCcService', () => {
  let service: NgxMatCcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatCcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
