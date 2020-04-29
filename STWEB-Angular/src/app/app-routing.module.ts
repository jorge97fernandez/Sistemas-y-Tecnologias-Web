import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { EntryComponent } from './entry/entry.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistryComponent } from './registry/registry.component';
import { StatsAdminComponent } from './stats-admin/stats-admin.component';
import { StatsUserComponent } from './stats-user/stats-user.component';

const routes: Routes = [
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'chat/entry', component: ChatEntryComponent },
  { path: 'chat/user', component: ChatUserComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'index/Admin', component: IndexAdminComponent },
  { path: 'index/User', component: IndexUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'registry', component: RegistryComponent },
  { path: 'stats/Admin', component: StatsAdminComponent },
  { path: 'stats/User', component: StatsUserComponent },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }