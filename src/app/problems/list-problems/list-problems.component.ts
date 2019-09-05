import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemsService } from '../services/problems.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';
import { allSettled } from 'q';

@Component({
  selector: 'app-list-problems',
  templateUrl: './list-problems.component.html',
  styleUrls: ['./list-problems.component.css']
})
export class ListProblemsComponent implements OnInit, OnDestroy {

  searchDisabled = false
  problems: ProblemInfo[] = [];
  parameters: ProblemSearch = {
    search: null
  };

  private search$: Subscription;

  constructor(
    private router: Router,
    private service: ProblemsService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.executeLoadProblems()
  }

  loadProblems(form: NgForm): void {
    if (form.valid) {
      this.executeLoadProblems();
    }
  }

  private executeLoadProblems(): void {
    this.searchDisabled = true;
    this.removeOldSubscription();
    this.search$ = this.service
      .listProblems(this.parameters)
      .subscribe(
        problems => {
          this.searchDisabled = false;
          this.problems = problems.slice(0, 10);
        },
        error => {
          this.alertService.error(error.code);
          this.router.navigateByUrl('/');
        },
        () => {
          this.searchDisabled = false;
        }
      )
  }

  ngOnDestroy() {
    this.removeOldSubscription();
  }

  viewProblem(id: string): void {
    this.router.navigateByUrl('/problems/view', { queryParams: { id: id } });
  }

  private removeOldSubscription(): void {
    if (this.search$) {
      this.search$.unsubscribe();
    }
  }
}
