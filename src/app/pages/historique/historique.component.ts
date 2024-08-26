import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {Router} from "@angular/router";
import {ExchangeService} from "../../services/exchange.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    FormsModule
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {

  exchanges : any;
  idUser: string = localStorage.getItem('id') ?? '';
  latitude: number = 0;
  longitude: number = 0;
  canOpenRating = true;
  displayStyleRating= "block";
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  comment: string = '';

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

    this.exchangeService.receiveExchange(exchangeId, data).subscribe({
      next: () => {
        this.canOpenRating = true
        this.displayStyleRating = 'block'
      },
      error: () => {}
    });
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

  closePopupRating(){
    this.displayStyleRating = "none";
  }

  openScanner() {
  }

  rate(star: number): void {
    this.rating = star;
    console.log("rating "+this.rating)
  }

  // Submit the rating and comment
  submitRating(): void {
    if (this.rating > 0 && this.comment.trim()) {
      // Perform the action to send the rating and comment
      console.log("Rating:", this.rating, "Comment:", this.comment);

      // Reset after submission
      this.rating = 0;
      this.comment = '';
      this.closePopupRating();
    } else {
      alert('Veuillez sélectionner une note et écrire un commentaire.');
    }
  }
}
