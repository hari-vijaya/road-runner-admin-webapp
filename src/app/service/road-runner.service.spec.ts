import { TestBed } from '@angular/core/testing';

import { RoadRunnerService } from './road-runner.service';

describe('RoadRunnerService', () => {
  let service: RoadRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
