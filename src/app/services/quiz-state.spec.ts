import { TestBed } from '@angular/core/testing';

import { QuizState } from './quiz-state';

describe('QuizState', () => {
  let service: QuizState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
