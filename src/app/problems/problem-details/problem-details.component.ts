import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProblemsService } from '../services/problems.service';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/core/auth/auth.storage.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/core/forms/forms.service';

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit, OnDestroy {
  submitDisabled = true;

  problem: ProblemDetails = {
    id: null,
    name: '',
    creatorId: null,
    creatorName: '',
    description: '',
  }

  solutionResults: SolutionResults = null;

  solutionCode = '';

  private details$: Subscription;
  private solution$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthStorageService,
    private service: ProblemsService,
    private formService: FormService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.details$ = this.route
      .queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.getProblemDetails(id)))
      .subscribe(
        problem => {
          this.problem = problem;
          this.submitDisabled = false;
          if (problem.creatorId === this.auth.getUserId()) {
            this.router.navigateByUrl('/problems/manage', { queryParams: { id: problem.id } });
          }
        },
        error => {
          this.alertService.error(error.code);
          this.back();
        }
      );
  }

  solve(form: NgForm) {
    if (form.valid) {
      this.submitDisabled = true;
      this.executeSolve();
    } else {
      this.formService.touchForm(form);
    }
  }

  private executeSolve() {
    this.deleteSubscription(this.solution$);
    const request: SolutionRequest = { code: this.solutionCode };
    this.solution$ = this.service
      .solve(this.problem.id, request)
      .subscribe(
        results => {
          this.submitDisabled = false;
          this.solutionResults = results;
          this.alertService.success('Solution processed');
        },
        error => {
          this.submitDisabled = false;
          this.alertService.error(error.code);
        },
        () => {
          this.submitDisabled = false;
        }
      );
  }

  back() {
    this.router.navigateByUrl('/problems');
  }

  ngOnDestroy() {
    this.deleteSubscription(this.details$);
    this.deleteSubscription(this.solution$);
  }

  private deleteSubscription(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

}
