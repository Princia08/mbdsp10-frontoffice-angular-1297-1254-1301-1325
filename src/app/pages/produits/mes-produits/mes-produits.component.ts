import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ProduitService} from "../../../services/produit.service";

@Component({
  selector: 'app-mes-produits',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './mes-produits.component.html',
  styleUrl: './mes-produits.component.css'
})
export class MesProduitsComponent {

  constructor(private router: Router, private produitService: ProduitService) {
  }

  products : any;
  userId = localStorage.getItem('id') ?? '';

  ngOnInit() {
    this.getallProducts();
  }

  seeDetails(id: string) {
    this.router.navigate(['/home/details-produit', id]);
  }

  getallProducts() {
    this.produitService.getProductByUserId(this.userId).subscribe({
      next: res => {
        this.products = res.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
