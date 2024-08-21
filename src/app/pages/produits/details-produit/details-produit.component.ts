import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../../../services/produit.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent {
  id = '';
  product: any;

  constructor(private router: Router, private route: ActivatedRoute, private produitService: ProduitService) {
      this.id = this.route.snapshot.params['id'];
      this.getProductById();
  }

  seeDetails(id: string) {
    this.router.navigate(['/home/update-produit', id]);
  }

  getProductById() {
    this.produitService.getProductById(this.id).subscribe({
      next: res => {
        this.product = res.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
