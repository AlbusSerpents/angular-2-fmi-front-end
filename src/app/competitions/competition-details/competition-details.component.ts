import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../services/competitions.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {
  actionsDisabled = true;

  competition: CompetitionDetails = {
    id: null,
    name: '',
    problems: [],
    submitions: 0,
    creatorId: null,
    creatorName: '',
  }

  private details$: Subscription;
  private participation$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private service: CompetitionsService,
  ) { }

  ngOnInit() {
    this.details$ = this.route
      .queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.getCompeitionById(id)))
      .subscribe(
        competition => {
          this.competition = competition;
          this.actionsDisabled = false;
        },
        error => {
          this.alertService.error(error.code);
          this.back();
        }
      );
  }

  enter() {
    this.actionsDisabled = true;
    this.service
      .enterCompeition(this.competition.id)
      .subscribe(result => {
        const message = `You have entered ${this.competition.name}. Your current score is ${result.score}`;
        this.alertService.success(message);
        this.actionsDisabled = false;
      }, error => {
        this.actionsDisabled = false;
        this.alertService.error(error.code);
      }, () => {
        this.actionsDisabled = false;
      });
  }

  viewProblem(id: string) {
    this.router.navigate(['/problems/view'], { queryParams: { id: id } });
  }

  back() {
    this.router.navigateByUrl('/competitions');
  }

  ngOnDestroy() {
    this.deleteSubscription(this.details$);
    this.deleteSubscription(this.participation$);
  }

  private deleteSubscription(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }
}
