import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";
import {ProduitService} from "../../services/produit.service";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {

  exchanges : any;

  ngOnInit() {
    this.getAllExchanges();
  }

  constructor(private router: Router, private exchangeService: ExchangeService) {
  }

  getAllExchanges(){
    this.exchangeService.getAllExchanges().subscribe({
      next: res => {
        this.exchanges = res.data.map((exchange: any) => {
          // Map owner products to a string
          const ownerProducts = exchange.owner_proposition.Products.map((product: any) => product.product_name).join(', ');

          // Map taker products to a string
          const takerProducts = exchange.taker_proposition.Products.map((product: any) => product.product_name).join(', ');

          // Return the modified exchange object with new properties
          return {
            ...exchange,
            ownerProducts,
            takerProducts
          };
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openScanner() {

  }
}
