import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthStorageService } from 'src/app/core/auth/auth.storage.service';
import { p } from '@angular/core/src/render3';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/core/forms/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  submitDisabled = false;
  profile: MyProfile = {
    name: '',
    id: null,
    email: '',
    username: '',
  };

  private userId: string;

  private getProfile$: Subscription;
  private editProfile$: Subscription;

  constructor(
    private router: Router,
    private service: UserService,
    private formService: FormService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProfile$ = this.service
      .getMyProfile()
      .subscribe(
        user => {
          this.profile = user;
          this.userId = user.id;
        },
        error => {
          this.alertService.error(error.code);
        }
      );
  }

  back() {
    this.router.navigateByUrl('/');
  }

  edit(form: NgForm) {
    this.submitDisabled = true;
    if (form.valid) {
      this.executeEdit();
    } else {
      this.submitDisabled = false;
      this.formService.touchForm(form);
    }
  }

  private executeEdit(): void {
    const updateRequest = this.toUpdateRequest(this.profile);
    this.service
      .updateProfile(this.userId, updateRequest)
      .subscribe(
        () => {
          this.alertService.success('Profile Updated')
          this.router.navigateByUrl('/home');
        },
        error => {
          this.alertService.error(error);
        },
        () => {
          this.submitDisabled = false;
        }
      )

  }

  private toUpdateRequest(profile: MyProfile): UpdateProfileRequest {
    return {
      name: profile.name,
      email: profile.email,
    }
  }

  ngOnDestroy() {
    if (this.getProfile$) {
      this.getProfile$.unsubscribe();
    }
    if (this.editProfile$) {
      this.editProfile$.unsubscribe();
    }
  }

}
