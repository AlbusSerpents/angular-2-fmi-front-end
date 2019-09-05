import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    CoreModule,
    routing,
    RouterModule,
    HomeModule,
    UsersModule,
    ProblemsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
