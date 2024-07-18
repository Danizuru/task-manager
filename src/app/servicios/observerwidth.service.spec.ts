import { TestBed } from '@angular/core/testing';

import { ScreenService } from './observerwidth.service';

describe('ObserverwidthService', () => {
  let service: ScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
