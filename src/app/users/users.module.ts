import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, CoreModule],
  providers: [UserService],
  declarations: [MyProfileComponent, UserProfileComponent],
  exports: [MyProfileComponent, UserProfileComponent]
})
export class UsersModule { }
