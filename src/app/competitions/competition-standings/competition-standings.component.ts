import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../services/competitions.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-competition-standings',
  templateUrl: './competition-standings.component.html',
  styleUrls: ['./competition-standings.component.css']
})
export class CompetitionStandingsComponent implements OnInit, OnDestroy {

  searchDisabled = false;
  standings: CompetitionStandingsRecord[] = [];

  private data$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private service: CompetitionsService) { }

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions(): void {
    this.searchDisabled = true;
    this.data$ = this.route
      .queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.getStandings(id))
      ).subscribe(
        competitions => {
          this.searchDisabled = false;
          this.standings = competitions;
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

  back() {
    this.router.navigateByUrl('/competitions');
  }

  ngOnDestroy() {
    if (this.data$) {
      this.data$.unsubscribe();
    }
  }
}
