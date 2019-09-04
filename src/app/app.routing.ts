import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LoggedInChildGuard } from './core/guards/logged-in.child.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginComponent } from './home/login/login.component';

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
    path: 'home',
    component: HomePageComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInChildGuard]
  }
];

export const routing = RouterModule.forRoot(routes, {});