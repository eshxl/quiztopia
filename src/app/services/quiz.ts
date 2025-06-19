// src/app/services/quiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get('https://opentdb.com/api_category.php');
  }

  getQuestions(amount: number, category?: string, difficulty?: string): Observable<any> {
    let url = `${this.apiUrl}?amount=${amount}`;

    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    url += `&type=multiple`;

    return this.http.get(url);
  }
}
