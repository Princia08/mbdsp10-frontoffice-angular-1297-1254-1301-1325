import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {

  constructor(private router: Router) {
  }

  items = Array(10).fill(null).map((_, i) => ({
    id: i.toString(),
    imageSrc: 'assets/img/produits/haltere.png',
    title: 'Haltère',
    owner: 'John Doe',
    date: '12-10-24'
  }));

  seeDetails(id: string) {
    this.router.navigate(['/home/details-produit', id]);
  }
}
