import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometitionsListComponent } from './competitions-list/cometitions-list.component';
import { CompetitionsService } from './services/competitions.service';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { CompetitionStandingsComponent } from './competition-standings/competition-standings.component';

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule, RouterModule],
  providers: [CompetitionsService],
  declarations: [CometitionsListComponent, CompetitionDetailsComponent, CompetitionStandingsComponent],
  exports: [CometitionsListComponent, CompetitionDetailsComponent, CompetitionStandingsComponent]
})
export class CompetitionsModule { }
