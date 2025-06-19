// src/app/pages/quiz/quiz.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz';
import { QuizStateService } from '../../services/quiz-state';
import { CanComponentDeactivate } from '../../guards/can-deactivate-guard';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
  standalone: true,
  imports: [CommonModule]
})
export class QuizComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  questions: Question[] = [];
  currentIndex: number = 0;
  score: number = 0;
  loading: boolean = true;
  selectedOption: string | null = null;
  quizCompleted: boolean = false;
  errorMsg: string | null = null;

  private beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to reload? Your progress will be lost.';
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private state: QuizStateService
  ) {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  ngOnInit(): void {
    const amount = Number(this.route.snapshot.queryParamMap.get('amount')) || 10;
    const category = this.route.snapshot.queryParamMap.get('category') || '';
    const difficulty = this.route.snapshot.queryParamMap.get('difficulty') || '';

    this.state.setLastSettings({ amount, category, difficulty });

    this.quizService.getQuestions(amount, category, difficulty).subscribe(
      (response) => {
        console.log("API Response:", response);
        this.questions = response.results.map((q: any) => ({
          ...q,
          options: this.shuffle([q.correct_answer, ...q.incorrect_answers])
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Error loading quiz questions:', error);
        this.errorMsg = 'Oops! Failed to load questions. Please try again.';
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  nextQuestion(): void {
    const currentQ = this.questions[this.currentIndex];
    if (this.selectedOption === currentQ.correct_answer) {
      this.score++;
    }
    this.selectedOption = null;
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.quizCompleted = true;
      this.state.setScore(this.score);
      this.state.setTotal(this.questions.length);
      setTimeout(() => this.router.navigate(['/result']), 1000);
    }
  }

  canDeactivate(): boolean {
    if (this.quizCompleted) return true;
    return confirm('Are you sure you want to leave? Your quiz progress will be lost.');
  }
}