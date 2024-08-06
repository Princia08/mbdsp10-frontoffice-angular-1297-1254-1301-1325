import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentification/login/login.component';
import {InscriptionComponent} from "./pages/authentification/inscription/inscription.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProduitsComponent} from "./pages/produits/produits.component";

export const routes: Routes = [
    { path : '', component : LoginComponent },
    { path : 'login', component : LoginComponent },
    { path : 'signin', component : InscriptionComponent },
    {
      path : 'home',
      component : HomeComponent,
      children : [
        { path : '', component : ProduitsComponent },
        { path : 'produits', component : ProduitsComponent },
        { path : 'login', component : LoginComponent }
      ]
    }
];
