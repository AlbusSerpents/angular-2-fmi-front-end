import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProblemsService } from '../services/problems.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-problem-statistics',
  templateUrl: './problem-statistics.component.html',
  styleUrls: ['./problem-statistics.component.css']
})
export class ProblemStatisticsComponent implements OnInit, OnDestroy {

  searchDisabled = true;
  statistics: ProblemSubmition[] = [];

  private statistics$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ProblemsService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.statistics$ = this.route
      .queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.statistics(id))
      ).subscribe(
        results => {
          this.searchDisabled = false;
          this.statistics = results;
        },
        error => {
          this.alertService.error(error.code);
        },
        () => {
          this.searchDisabled = false;
        }
      );
  }

  back() {
    this.router.navigateByUrl('/problems');
  }

  ngOnDestroy() {
    if (this.statistics$) {
      this.statistics$.unsubscribe();
    }
  }
}
