import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizStateService {
  private scoreSubject = new BehaviorSubject<number>(0);
  score$ = this.scoreSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  private lastSettings: { amount: number, category: string, difficulty: string } | null = null;

  setScore(score: number) {
    this.scoreSubject.next(score);
  }

  setTotal(total: number) {
    this.totalSubject.next(total);
  }

  reset() {
    this.scoreSubject.next(0);
    this.totalSubject.next(0);
  }

  setLastSettings(settings: { amount: number, category: string, difficulty: string }) {
    this.lastSettings = settings;
  }

  getLastSettings() {
    return this.lastSettings;
  }
}
