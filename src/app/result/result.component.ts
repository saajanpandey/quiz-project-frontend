import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  username: string | null = null;
  results: any = {};
  averageScore: number = 0;
  highestScore: number = 0;
  lowestScore: number = 0;
  percentage: number = 0;
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    const token = localStorage.getItem('token');

    // Get the results from navigation state
    const state: any = this.route.snapshot.paramMap.get('quizResults');
    if (state && state.quizResults) {
      this.results = state.quizResults;
      this.averageScore = this.results.average_score;
      this.highestScore = this.results.highest_score;
      this.lowestScore = this.results.lowest_score;
      this.percentage = this.calculatePercentage(this.results.score);
      this.message = this.getMessage(this.results.score);
    } else {
      // Fetch results from the API
      this.http.get('http://127.0.0.1:8000/api/results', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe((data: any) => {
        this.results = data;
        this.averageScore = data.average_score;
        this.highestScore = data.highest_score;
        this.lowestScore = data.lowest_score;
        this.percentage = this.calculatePercentage(data.score);
        this.message = this.getMessage(data.score);
      }, error => {
        console.error('Failed to fetch results', error);
      });
    }
  }

  calculatePercentage(score: number): number {
    return (score / 5) * 100;
  }

  getMessage(score: number): string {
    if (score === 0 || score === 1 || score === 2) {
      return 'Please try again!';
    } else if (score === 3) {
      return 'Good job!';
    } else if (score === 4) {
      return 'Excellent work!';
    } else if (score === 5) {
      return 'You are a genius!';
    } else {
      return '';
    }
  }

  onRetry(): void {
    this.router.navigate(['/quiz']);
  }
}
