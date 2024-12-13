import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result: any;
  feedback: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizResult().subscribe(
      result => {
        this.result = `You scored ${result.score} out of ${result.totalQuestions}`;
        this.feedback = result.feedback;
      },
      error => {
        console.error('Error fetching quiz result:', error);
      }
    );
  }
}
