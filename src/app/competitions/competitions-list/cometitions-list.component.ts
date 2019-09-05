import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CompetitionsService } from '../services/competitions.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cometitions-list',
  templateUrl: './cometitions-list.component.html',
  styleUrls: ['./cometitions-list.component.css']
})
export class CometitionsListComponent implements OnInit {

  searchDisabled = false;
  compeitions: CompetitionInfo[] = [];
  parameters: CompetitionSearch = {
    search: null
  };

  private search$: Subscription;

  constructor(
    private router: Router,
    private service: CompetitionsService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.executeLoadCompetitions()
  }

  loadCompetitions(form: NgForm): void {
    if (form.valid) {
      this.executeLoadCompetitions();
    }
  }

  private executeLoadCompetitions(): void {
    this.searchDisabled = true;
    this.removeOldSubscription();
    this.search$ = this.service
      .listCompeitions(this.parameters)
      .subscribe(
        competitions => {
          this.searchDisabled = false;
          this.compeitions = competitions;
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

  viewCompetition(id: string): void {
    this.router.navigate(['/competitions/view'], { queryParams: { id: id } });
  }

  statistics(id: string): void {
    this.router.navigate(['/competitions/standings'], { queryParams: { id: id } });
  }

  private removeOldSubscription(): void {
    if (this.search$) {
      this.search$.unsubscribe();
    }
  }
}
