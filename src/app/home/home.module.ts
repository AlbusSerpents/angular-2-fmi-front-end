import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeService } from './services/home.service';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [HomeService],
  declarations: [HomePageComponent, LoginComponent, RegistrationComponent],
  exports: [HomePageComponent, LoginComponent, RegistrationComponent]
})
export class HomeModule { }
