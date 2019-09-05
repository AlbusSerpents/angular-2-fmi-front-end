import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LoggedInChildGuard } from './core/guards/logged-in.child.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ListProblemsComponent } from './problems/list-problems/list-problems.component';
import { ProblemDetailsComponent } from './problems/problem-details/problem-details.component';
import { ProblemStatisticsComponent } from './problems/problem-statistics/problem-statistics.component';
import { CometitionsListComponent } from './competitions/competitions-list/cometitions-list.component';
import { CompetitionDetailsComponent } from './competitions/competition-details/competition-details.component';
import { CompetitionStandingsComponent } from './competitions/competition-standings/competition-standings.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'problems',
    pathMatch: 'full',
    component: ListProblemsComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'problems/view',
    pathMatch: 'full',
    component: ProblemDetailsComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'problems/statistics',
    component: ProblemStatisticsComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'competitions',
    component: CometitionsListComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'competitions/view',
    component: CompetitionDetailsComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  },
  {
    path: 'competitions/standings',
    component: CompetitionStandingsComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  }
];

export const routing = RouterModule.forRoot(routes, {});
