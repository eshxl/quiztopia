import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { QuizComponent } from './components/quiz/quiz';
import { ResultComponent } from './components/result/result';
import { CanDeactivateGuard } from './guards/can-deactivate-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' }
];