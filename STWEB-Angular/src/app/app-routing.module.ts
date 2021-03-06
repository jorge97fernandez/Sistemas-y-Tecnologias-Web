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
import { RegistryGoogleComponent } from './registry-google/registry-google.component';
import { AccionUsuarioComponent } from './accion-usuario/accion-usuario.component';
import { UpdateDataComponent } from "./update-data/update-data.component";

const routes: Routes = [
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'chat-entry', component: ChatEntryComponent },
  { path: 'chat-user', component: ChatUserComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'index-admin', component: IndexAdminComponent },
  { path: 'index-user', component: IndexUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'registry', component: RegistryComponent },
  { path: 'registry-google', component: RegistryGoogleComponent },
  { path: 'stats-admin', component: StatsAdminComponent },
  { path: 'stats-user', component: StatsUserComponent },
  { path: 'accion-usuario', component: AccionUsuarioComponent },
  { path: 'update-data', component: UpdateDataComponent },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
