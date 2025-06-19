import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  quizSettings = {
    category: '',
    difficulty: '',
    amount: 10
  };

  categories: any[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getCategories().subscribe(
      (res) => {
        this.categories = res.trivia_categories;
        console.log("Fetched categories:", this.categories);
      },
      (err) => {
        console.error("Error fetching categories:", err);
      }
    );
  }

  get isAmountValid(): boolean {
    const amt = this.quizSettings.amount;
    return amt >= 1 && amt <= 20;
  }

  startQuiz() {
    const { category, difficulty, amount } = this.quizSettings;
    if (!this.isAmountValid) {
      alert("Please enter a number between 1 and 20.");
      return;
    }
    let queryParams: any = { amount };
    if (category) queryParams.category = category;
    if (difficulty) queryParams.difficulty = difficulty;
    this.router.navigate(['/quiz'], { queryParams });
  }
}
