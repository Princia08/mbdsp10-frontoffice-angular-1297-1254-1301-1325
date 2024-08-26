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
  idUser: string = localStorage.getItem('id') ?? '';
  latitude: number = 0;
  longitude: number = 0;

  ngOnInit() {
    this.getAllExchanges();
    this.getCurrentLocation();
  }

  constructor(private router: Router, private exchangeService: ExchangeService) {
  }

  getAllExchanges() {
    this.exchangeService.getAllExchanges().subscribe({
      next: res => {
        this.exchanges = res.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by date
          .map((exchange: any) => {
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

  canAccept(ownerId: string, status: string){
    return this.idUser == ownerId && status === 'CREATED'
  }

  canReceive(status: string){
    return status === 'ACCEPTED'
  }

  receiveExchange(exchangeId: string) {
    const data = {
      accept: true,
      longitude: this.longitude,
      latitude: this.latitude
    };

    this.exchangeService.receiveExchange(exchangeId, data).subscribe();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (error) => {
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  acceptExchange(exchangeId: string){
    this.exchangeService.acceptExchange(exchangeId).subscribe({
      next: res => {
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  cancelExchange(exchangeId: string){
    this.exchangeService.cancelExchange(exchangeId).subscribe({
      next: res => {
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openScanner() {
  }
}
