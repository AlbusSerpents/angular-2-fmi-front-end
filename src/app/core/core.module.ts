import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorService } from './http/connector.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedInChildGuard } from './guards/logged-in.child.guard';
import { FormsModule } from '@angular/forms';
import { AuthStorageService } from './auth/auth.storage.service';
import { AlertService } from './alert/alert.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ConnectorService,
    AuthStorageService,
    LoggedInGuard,
    LoggedInChildGuard,
    AlertService
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class CoreModule { }
