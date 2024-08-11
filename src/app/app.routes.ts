import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentification/login/login.component';
import { InscriptionComponent } from './pages/authentification/inscription/inscription.component';

export const routes: Routes = [
    { path : '', component : LoginComponent },
    { path : 'login', component : LoginComponent },
    { path : 'signup', component : InscriptionComponent },
    {
      path : 'home',
      component : HomeComponent,
      children : [
        { path : '', component : ProduitsComponent },
        { path : 'produits', component : ProduitsComponent },
        { path : 'addProduit', component : AddProduitComponent },
        { path : 'login', component : LoginComponent },
        { path : 'produits/details-produit/:id', component : DetailsProduitComponent }
      ]
    }
];
