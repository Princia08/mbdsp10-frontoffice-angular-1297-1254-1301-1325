import { Component } from '@angular/core';

@Component({
  selector: 'app-add-proposition',
  standalone: true,
  imports: [],
  templateUrl: './add-proposition.component.html',
  styleUrl: './add-proposition.component.css'
})
export class AddPropositionComponent {
  items = Array(10).fill(null).map((_, i) => ({
    id: i.toString(),
    imageSrc: 'assets/img/produits/haltere.png',
    title: 'Haltère',
    owner: 'John Doe',
    date: '12-10-24'
  }));

  selectedIds: string[] = [];

  onCheckboxChange(event: any, id: string): void {
    if (event.target.checked) {
      this.selectedIds.push(id);  // Add to selected array
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);  // Remove from selected array
    }
  }

  getSelectedItems(): void {
    console.log('Selected item IDs:', this.selectedIds);
    // Perform any action you want with the selected IDs
  }
}
