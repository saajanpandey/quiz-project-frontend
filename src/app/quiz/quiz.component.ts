import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  username: string | null = null;
  quizData: any[] = [];
  selectedAnswers: { [questionId: number]: string } = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Get the username from local storage
    this.username = localStorage.getItem('username');

    // Fetch quiz data
    const token = localStorage.getItem('token');
    this.http.get('http://127.0.0.1:8000/api/quiz', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data: any) => {
        this.quizData = data;
        console.log(this.quizData);
      },
      error: (error) => {
        console.error('Failed to fetch quiz data', error);
      }
    });
  }

  onAnswerChange(questionId: number, selectedOption: string): void {
    this.selectedAnswers[questionId] = selectedOption;
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');

    // Prepare the answers to submit
    const answers = Object.keys(this.selectedAnswers).map(questionId => ({
      id: parseInt(questionId, 10),
      selected_option: this.selectedAnswers[parseInt(questionId, 10)]
    }));

    // Submit answers to backend
    this.http.post('http://127.0.0.1:8000/api/results', { answers }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response: any) => {
        console.log('Quiz submitted successfully', response);
        // Navigate to the result component with the response data
        this.router.navigate(['/result'], { state: { quizResults: response } });
      },
      error: (error) => {
        console.error('Failed to submit quiz', error);
      }
    });
  
  // Mocked response for demonstration
  // const mockedResponse = {
  //   score: 1,
  //   percentage: 20.0,
  //   message: "Please try again!"
  // };

  // Directly use mocked response to simulate submission success
  // console.log('Quiz submitted successfully', mockedResponse);
  // // Navigate to the result component with the mocked response
  // this.router.navigate(['/result'], { state: { quizResults: mockedResponse } });
  
  
  }

  onLogout(): void {
    // Clear user session data
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  
    // Redirect to login page
    this.router.navigate(['/']);
    
    console.log('User logged out');
  }
}
