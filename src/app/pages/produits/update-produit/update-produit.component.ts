import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ProduitService } from '../../../services/produit.service';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './update-produit.component.html',
  styleUrl: './update-produit.component.css'
})
export class UpdateProduitComponent {
  id: string = '';
  product: any;
  produitForm : any;
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private produitService: ProduitService) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getProductById();
  }

  // champs du formulaire
  
  getProductById() {
    this.produitService.getProductById(this.id).subscribe({
      next: res => {
        this.product = res.data;
        this.produitForm = new FormGroup({
          product_name: new FormControl(this.product.product_name),
          description: new FormControl(this.product.description)
        })
        
      },
      error: err => {
        console.log(err);
      }
    });
  }
  updateProduct() {
    this.produitService.updateProduct(this.id,this.produitForm.value).subscribe({
      next: res => {
        console.log("form " + this.produitForm.value);
        console.log("res " + res);
        this.router.navigate(['/home/details-produit', res.data.id]);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
