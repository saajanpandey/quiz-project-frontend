import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizResultSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/quiz');
  }

  submitAnswers(answers: { id: number, selected_option: string }[]) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post<any>('http://127.0.0.1:8000/api/quiz/submit', { answers }, { headers });
  }

  setQuizResult(result: any) {
    this.quizResultSubject.next(result);
  }

  getQuizResult() {
    return this.quizResultSubject.asObservable();
  }
}
