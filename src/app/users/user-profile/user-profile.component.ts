import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  submitDisabled = true;
  profile: UserProile = {
    name: '',
    id: null,
    email: '',
  };

  private getProfile$: Subscription;

  constructor(
    private router: Router,
    private service: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProfile$ = this.route.queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.getProfile(id))
      ).subscribe(
        user => {
          this.profile = user;
          this.submitDisabled = false;
        },
        error => {
          this.alertService.error(error.code);
          this.back();
        },
        () => {
          this.submitDisabled = false;
        }
      );
  }

  back() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.getProfile$) {
      this.getProfile$.unsubscribe();
    }
  }
}
