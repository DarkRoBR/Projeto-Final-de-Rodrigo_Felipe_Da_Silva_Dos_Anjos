import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-filter-minimizable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-filter-minimizable.html',
  styleUrls: ['./restaurant-filter-minimizable.scss']
})
export class RestaurantFilterMinimizableComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = '';
  @Output() categorySelected = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();

  searchTerm: string = '';
  isMinimized: boolean = false;

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  toggleMinimized() {
    this.isMinimized = !this.isMinimized;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.categorySelected.emit('');
    this.searchChanged.emit('');
  }
}

