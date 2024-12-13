import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup, MatRadioModule } from '@angular/material/radio'; // Specific imports
import { HttpClientModule } from  '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { QuizService } from './service/quiz.service';
import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizComponent,
    DashboardComponent,
    RegisterComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatRadioModule,   
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    MatRadioModule,
  ],
  providers: [QuizService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
