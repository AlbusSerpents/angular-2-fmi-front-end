import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometitionsListComponent } from './competitions-list/cometitions-list.component';
import { CompetitionsService } from './services/competitions.service';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule, RouterModule],
  providers: [CompetitionsService],
  declarations: [CometitionsListComponent],
  exports: [CometitionsListComponent]
})
export class CompetitionsModule { }
