import { TestBed, inject } from '@angular/core/testing';

import { BlogServicesService } from './blog-services.service';

describe('BlogServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogServicesService]
    });
  });

  it('should be created', inject([BlogServicesService], (service: BlogServicesService) => {
    expect(service).toBeTruthy();
  }));
});
