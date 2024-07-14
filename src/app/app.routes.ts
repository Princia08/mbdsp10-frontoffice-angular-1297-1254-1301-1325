import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentification/login/login.component';
import {InscriptionComponent} from "./pages/authentification/inscription/inscription.component";

export const routes: Routes = [
    { path : '', component : LoginComponent },
    { path : 'signin', component : InscriptionComponent }
];
