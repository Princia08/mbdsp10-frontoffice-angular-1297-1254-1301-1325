import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent {
  id = ''
  constructor(private route: ActivatedRoute) {
      this.id = this.route.snapshot.params['id'];
  }
}
