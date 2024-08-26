import { Component, OnInit } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProduitService} from "../../../services/produit.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {
  fileName!: string;
  categories: any;
  selectedCategories: string[] = [];
  file: any;

  ngOnInit() {
    this.getAllCategories();
  }

  constructor(private router: Router, private produitService: ProduitService, private http: HttpClient) {
  }

  // champs du formulaire
  produitForm = new FormGroup({
    product_name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categories: new FormControl([''], [Validators.required])
  })

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file, file.name);
      this.file = file;
      // const upload$ = this.http.post(this.url + "/upload", formData);
      // upload$.subscribe();
    }
  }

  getAllCategories() {
    this.produitService.getAllCategories().subscribe({
      next: res => {
        this.categories = res.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addProduct() {
    this.produitForm.patchValue({categories: this.selectedCategories})
    this.produitService.addProduct(this.produitForm.value).subscribe({
      next: res => {
        console.log(this.file);
        this.produitService.uploadImage(this.file, res.data.id).subscribe({
          next: res => {
            console.log(res);
          },
          error: err => {
            console.log(err);
          }
        });
        this.router.navigate(['/home/details-produit', res.data.id]);

      },
      error: err => {
        console.log(err);
      }
    });
  }

  onCheckboxChange(event: any, id: string): void {
    if (event.target.checked) {
      this.selectedCategories.push(id);
    } else {
      this.selectedCategories = this.selectedCategories.filter(selectedCategories => selectedCategories !== id);
    }
  }
}
