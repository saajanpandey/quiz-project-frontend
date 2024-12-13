import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post('http://127.0.0.1:8000/api/login', loginData).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);

          // Store the username and token in local storage
          localStorage.setItem('username', loginData.username);
          localStorage.setItem('token', response.access);

          // Navigate to the quiz page
          this.router.navigate(['/quiz']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please try again.';
        }
      });
    }
  }
}
