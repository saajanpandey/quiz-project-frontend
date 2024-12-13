import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  results: any = {};
  username: string | null = null;
  scoreMessage: string = '';
  scorePercentage: number = 0;
  score: string = '';
  averageScore: number = 0;
  highestScore: number = 0;
  lowestScore: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   const state: any = this.route.snapshot.paramMap.get('quizResults');
  //   if (state && state.quizResults) {
  //     this.results = state.quizResults;
  //     console.log(this.results)
  //     this.scoreMessage  = this.results.message;
  //     this.scorePercentage = this.results.score;
  //     this.username = localStorage.getItem('username');
  //   }

  ngOnInit(): void {
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      this.results = JSON.parse(storedResults);
      this.scoreMessage = this.results.message;
      this.scorePercentage = this.results.percentage;
      this.score = this.results.score;
      this.username = localStorage.getItem('username');
      this.averageScore = this.results.average_score;
      this.highestScore = this.results.highest_score;
      this.lowestScore = this.results.lowest_score;
    }
    this.fetchResults();
  }

  fetchResults(): void {
    const token = localStorage.getItem('token');
    this.http
      .get('http://127.0.0.1:8000/api/results', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.results = data;
          this.averageScore = data.average_score.toFixed(2);
          this.highestScore = data.highest_score;
          this.lowestScore = data.lowest_score;
          this.username = localStorage.getItem('username');
        },
        (error) => {
          console.error('Failed to fetch results', error);
        }
      );
  }

  // calculateScore(): void {
  //   const score = this.results.score;
  //   const percentage = this.results.percentage;

  //   this.scorePercentage = percentage;

  //   // Determine score message based on the percentage
  //   if (score === 0 || score <= 2) {
  //     this.scoreMessage = 'Please try again!';
  //   } else if (score === 3) {
  //     this.scoreMessage = 'Good job!';
  //   } else if (score === 4) {
  //     this.scoreMessage = 'Excellent work!';
  //   } else if (score === 5) {
  //     this.scoreMessage = 'You are a genius!';
  //   }
  // }

  onRetry(): void {
    this.router.navigate(['/quiz']);
  }
}
