import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';

interface CategoryFilter {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-restaurant-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-filter.html',
  styleUrls: ['./restaurant-filter.scss']
})
export class RestaurantFilterComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();

  searchTerm = '';
  selectedCategory = '';
  
  categories: CategoryFilter[] = [
    { id: 'all', name: 'Todos', count: 0, icon: 'fas fa-utensils', color: '#6c757d' },
    { id: 'Pizza', name: 'Pizza', count: 0, icon: 'fas fa-pizza-slice', color: '#ff6b35' },
    { id: 'Hambúrguer', name: 'Hambúrguer', count: 0, icon: 'fas fa-hamburger', color: '#f7931e' },
    { id: 'Japonesa', name: 'Japonesa', count: 0, icon: 'fas fa-fish', color: '#4ecdc4' },
    { id: 'Italiana', name: 'Italiana', count: 0, icon: 'fas fa-utensils', color: '#e74c3c' },
    { id: 'Sobremesas', name: 'Sobremesas', count: 0, icon: 'fas fa-ice-cream', color: '#9b59b6' },
    { id: 'Saudável', name: 'Saudável', count: 0, icon: 'fas fa-leaf', color: '#27ae60' }
  ];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.updateCategoryCounts();
    
    // Escutar mudanças na categoria selecionada
    this.restaurantService.getSelectedCategory().subscribe(category => {
      this.selectedCategory = category;
    });
  }

  private updateCategoryCounts() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      // Atualizar contagem total
      this.categories[0].count = restaurants.length;
      
      // Atualizar contagem por categoria
      for (let i = 1; i < this.categories.length; i++) {
        const category = this.categories[i];
        category.count = this.restaurantService.getCategoryCount(category.id);
      }
    });
  }

  onCategoryClick(categoryId: string) {
    this.selectedCategory = categoryId === 'all' ? '' : categoryId;
    this.restaurantService.filterByCategory(this.selectedCategory);
    this.categorySelected.emit(this.selectedCategory);
  }

  onSearchChange() {
    this.restaurantService.searchRestaurants(this.searchTerm);
    this.searchChanged.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.restaurantService.filterByCategory('');
    this.restaurantService.searchRestaurants('');
    this.categorySelected.emit('');
    this.searchChanged.emit('');
  }

  getSelectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategory);
    return category ? category.name : '';
  }
}

