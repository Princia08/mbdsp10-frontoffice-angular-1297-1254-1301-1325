import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../../../services/produit.service";
import {Observable} from "rxjs";
import {DatePipe, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {
  id: string = '';
  product: any;
  idUser: string = localStorage.getItem('id') ?? '';
  idUserForExchange: string = '';
  isMyProduct = false;
  listProducts: any;
  listMyProducts: any;
  selectedIds: string[] = [];
  selectedMyIds: string[] = [];
  delivery_address: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private produitService: ProduitService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getProductById();
    this.checkProduct();
  }

  updateProduct(id: string) {
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

  checkProduct() {
    this.produitService.getProductById(this.id).subscribe({
      next: res => {
        this.isMyProduct = res.data.actual_owner.id == this.idUser;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  exchange(userId: string) {
    // get list of products of the owner
    this.produitService.getProductByUserId(userId).subscribe({
      next: res => {
        this.listProducts = res.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  chooseMyProduct() {
    // get list of my product
    this.produitService.getProductByUserId(this.idUser).subscribe({
      next: res => {
        this.listMyProducts = res.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onCheckboxChange(event: any, id: string, idUserForExchange: string): void {
    if (event.target.checked) {
      this.selectedIds.push(id);  // Add to selected array
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);  // Remove from selected array
    }
    this.idUserForExchange = idUserForExchange;
  }

  onCheckboxChangeMyProduct(event: any, id: string): void {
    if (event.target.checked) {
      this.selectedMyIds.push(id);  // Add to selected array
    } else {
      this.selectedMyIds = this.selectedMyIds.filter(selectedId => selectedId !== id);  // Remove from selected array
    }
  }

  cancel() {
    this.router.navigate(['/home/produits']);
  }

  confirm() {
    console.log(this.selectedIds);
    console.log(this.selectedMyIds);
    console.log("owner "+this.idUserForExchange);
    console.log("id User "+this.idUser);
  }
}
