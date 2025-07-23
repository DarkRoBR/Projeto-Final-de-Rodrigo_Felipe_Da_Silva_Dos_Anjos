import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../restaurant-card/restaurant-card';


/**
 * Componente de comparação de restaurantes
 * 
 * Permite comparar até 3 restaurantes lado a lado, mostrando:
 * - Informações básicas (nome, categoria, status)
 * - Avaliações e número de reviews
 * - Tempo de entrega
 * - Taxa de entrega
 * - Pedido mínimo
 * - Especialidades
 * 
 * Funcionalidades:
 * - Comparação visual com destaque para melhores/piores valores
 * - Interface responsiva
 * - Remoção individual de restaurantes
 * - Limpeza completa da comparação
 */

@Component({
  selector: 'app-restaurant-compare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-compare.html',
  styleUrls: ['./restaurant-compare.scss']
})
export class RestaurantCompareComponent {
  @Input() selectedRestaurants: Restaurant[] = [];
  @Input() isVisible: boolean = false;
  @Output() removeRestaurant = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onRemoveRestaurant(restaurantId: string) {
    this.removeRestaurant.emit(restaurantId);
  }

  onClearAll() {
    this.clearAll.emit();
  }

  onClose() {
    this.close.emit();
  }

  getDeliveryTimeNumber(deliveryTime: string): number {
    // Extrai o primeiro número da string "15-25 min"
    const match = deliveryTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  getComparisonClass(value: number, values: number[], isLower: boolean = true): string {
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (isLower) {
      // Para valores onde menor é melhor (tempo de entrega, taxa de entrega)
      if (value === min) return 'best-value';
      if (value === max) return 'worst-value';
    } else {
      // Para valores onde maior é melhor (avaliação)
      if (value === max) return 'best-value';
      if (value === min) return 'worst-value';
    }
    
    return 'neutral-value';
  }

  getRatingClass(): string[] {
    const ratings = this.selectedRestaurants.map(r => r.rating);
    return this.selectedRestaurants.map(r => this.getComparisonClass(r.rating, ratings, false));
  }

  getDeliveryTimeClass(): string[] {
    const times = this.selectedRestaurants.map(r => this.getDeliveryTimeNumber(r.deliveryTime));
    return this.selectedRestaurants.map(r => 
      this.getComparisonClass(this.getDeliveryTimeNumber(r.deliveryTime), times, true)
    );
  }

  getDeliveryFeeClass(): string[] {
    const fees = this.selectedRestaurants.map(r => r.deliveryFee);
    return this.selectedRestaurants.map(r => this.getComparisonClass(r.deliveryFee, fees, true));
  }

  getMinOrderClass(): string[] {
    const orders = this.selectedRestaurants.map(r => r.minOrder);
    return this.selectedRestaurants.map(r => this.getComparisonClass(r.minOrder, orders, true));
  }

  trackByRestaurantId(index: number, restaurant: Restaurant): string {
    return restaurant.id;
  }
}

