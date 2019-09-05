import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProblemsComponent } from './list-problems/list-problems.component';
import { CoreModule } from '../core/core.module';
import { ProblemsService } from './services/problems.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProblemDetailsComponent } from './problem-details/problem-details.component';
import { ProblemStatisticsComponent } from './problem-statistics/problem-statistics.component';

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule, RouterModule],
  providers: [ProblemsService],
  declarations: [ListProblemsComponent, ProblemDetailsComponent, ProblemStatisticsComponent],
  exports: [ListProblemsComponent, ProblemDetailsComponent, ProblemStatisticsComponent]
})
export class ProblemsModule { }
