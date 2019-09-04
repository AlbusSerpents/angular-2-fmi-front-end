import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { FormService } from 'src/app/core/forms/forms.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy {

  submitDisabled = false;

  request: RegistrationRequest = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  private subscription$: Subscription;

  constructor(
    private router: Router,
    private service: HomeService,
    private formsService: FormService,
    private alertService: AlertService) { }

  register(form: NgForm): void {
    this.submitDisabled = true;
    if (form.valid) {
      this.executeRegistration();
    } else {
      this.formsService.touchForm(form);
      this.submitDisabled = false;
    }
  }

  private executeRegistration(): void {
    this.subscription$ = this.service
      .register(this.request)
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
