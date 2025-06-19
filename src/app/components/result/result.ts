// src/app/pages/result/result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/quiz-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.html',
  styleUrls: ['./result.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultComponent implements OnInit {
  score: number = 0;
  total: number = 0;

  constructor(
    private state: QuizStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.state.score$.subscribe(s => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < s) {
          count++;
          this.score = count;
        } else {
          clearInterval(interval);
        }
      }, 90); // speed of count-up
    });

    this.state.total$.subscribe(t => this.total = t);
  }

  goHome(): void {
    this.state.reset();
    this.router.navigate(['/']);
  }

  tryAgain(): void {
    const settings = this.state.getLastSettings();
    if (settings) {
      this.state.reset();
      this.router.navigate(['/quiz'], {
        queryParams: {
          amount: settings.amount,
          category: settings.category,
          difficulty: settings.difficulty
        }
      });
    } else {
      alert('Previous settings not found. Returning to Home.');
      this.goHome();
    }
  }
}