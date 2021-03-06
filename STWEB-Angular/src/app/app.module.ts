import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { EntryComponent } from './entry/entry.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatsUserComponent } from './stats-user/stats-user.component';
import { StatsAdminComponent } from './stats-admin/stats-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "./services/user-service.service";
import { CurrentUserService } from "./current-user.service";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AgmCoreModule } from '@agm/core';
import { GeocodeService } from './entry/geocode.service';
import { Location } from './entry/location';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistryGoogleComponent } from './registry-google/registry-google.component';
import { AccionUsuarioComponent } from './accion-usuario/accion-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

//Para usar diagramas
import { ChartsModule } from '@rinminase/ng-charts';
import { UpdateDataComponent } from './update-data/update-data.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    IndexUserComponent,
    IndexAdminComponent,
    EntryComponent,
    ChatUserComponent,
    ChatEntryComponent,
    ProfileComponent,
    ChangePasswordComponent,
    StatsUserComponent,
    StatsAdminComponent,
    RegistryGoogleComponent,
    AccionUsuarioComponent,
    UpdateDataComponent
  ],
  entryComponents: [AccionUsuarioComponent, IndexAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgbModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    SocialLoginModule,
    AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCBqxbKfjVQAqz6VAgAj8bHGGYW-XOar-E'
        }),
    FontAwesomeModule
  ],
  providers: [
    CurrentUserService, UserService, GeocodeService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
