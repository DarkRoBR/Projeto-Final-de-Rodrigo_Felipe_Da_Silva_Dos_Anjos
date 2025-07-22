import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


/**
 * Componente de card de restaurante
 * 
 * Exibe informações do restaurante em formato de card:
 * - Imagem do restaurante
 * - Nome e categoria
 * - Avaliação e número de reviews
 * - Tempo de entrega
 * - Preço mínimo e taxa de entrega
 * - Especialidades (primeiras 3)
 * - Status (aberto/fechado)
 * 
 * Ações disponíveis:
 * - Adicionar/remover dos favoritos
 * - Adicionar/remover da comparação
 * - Visualizar cardápio
 */

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  isFavorite: boolean;
  discount?: number;
  specialties: string[];
  location?: string;
  menu?: MenuItem[];
  photos?: RestaurantPhotos;
}

export interface MenuItem {
  item: string;
  price?: number;
  description?: string;
  notes?: string;
}

export interface RestaurantPhotos {
  entrance?: string[];
  interior?: string[];
}

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-card.html',
  styleUrls: ['./restaurant-card.scss']
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
  @Input() isSelected: boolean = false;
  @Output() favoriteToggled = new EventEmitter<{id: string, isFavorite: boolean}>();
  @Output() restaurantViewed = new EventEmitter<string>();
  @Output() compareToggled = new EventEmitter<{id: string, isSelected: boolean}>();

  isLoading = false;

  getStatusClass(): string {
    return this.restaurant.isOpen ? 'status-open' : 'status-closed';
  }

  getStatusText(): string {
    return this.restaurant.isOpen ? 'Aberto' : 'Fechado';
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.restaurant.isFavorite = !this.restaurant.isFavorite;
    this.favoriteToggled.emit({
      id: this.restaurant.id,
      isFavorite: this.restaurant.isFavorite
    });
  }

  viewRestaurant(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.isLoading = true;
    this.restaurantViewed.emit(this.restaurant.id);
    
    // Simular carregamento
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  toggleCompare(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.isSelected = !this.isSelected;
    this.compareToggled.emit({
      id: this.restaurant.id,
      isSelected: this.isSelected
    });
  }
}

