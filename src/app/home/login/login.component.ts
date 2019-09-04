import { Component, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/core/forms/forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  submitDisabled = false;

  request: LoginRequest = {
    username: '',
    password: ''
  };

  private subscription$: Subscription;

  constructor(
    private router: Router,
    private service: HomeService,
    private formsService: FormService,
    private alertService: AlertService) { }

  login(form: NgForm): void {
    this.submitDisabled = true;
    if (form.valid) {
      this.executeLogin();
    } else {
      this.formsService.touchForm(form);
      this.submitDisabled = false;
    }
  }

  private executeLogin(): void {
    this.subscription$ = this.service
      .login(this.request)
      .subscribe(
        _ => {
          this.router.navigateByUrl('/home');
        },
        error => {
          this.alertService.error(error.code);
        },
        () => {
          this.submitDisabled = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
