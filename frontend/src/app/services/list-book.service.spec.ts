import { TestBed } from '@angular/core/testing';

import { ListBookService } from './list-book.service';

describe('ListBookService', () => {
  let service: ListBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
