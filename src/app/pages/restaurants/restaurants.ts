import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { RestaurantCardComponent, Restaurant } from '../../components/restaurant-card/restaurant-card';
import { RestaurantFilterComponent } from '../../components/restaurant-filter/restaurant-filter';
import { RestaurantCompareComponent } from '../../components/restaurant-compare/restaurant-compare';
import { RestaurantService } from '../../services/restaurant.service';

/**
 * Componente principal da página de restaurantes
 * 
 * Gerencia:
 * - Listagem de restaurantes com filtros
 * - Sistema de comparação de restaurantes
 * - Estados de carregamento e vazio
 * - Estatísticas dos restaurantes
 * 
 * Funcionalidades implementadas:
 * - Filtros por categoria e busca textual
 * - Sistema de favoritos
 * - Comparação de até 3 restaurantes
 * - Botão flutuante para acessar comparação
 * - Interface responsiva
 */

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    HeaderComponent,
    FooterComponent,
    RestaurantCardComponent,
    RestaurantFilterComponent,
    RestaurantCompareComponent
  ],
  templateUrl: './restaurants.html',
  styleUrls: ['./restaurants.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  filteredRestaurants: Restaurant[] = [];
  totalRestaurants = 0;
  isLoading = true;
  
  // Sistema de comparação
  selectedRestaurants: Restaurant[] = [];
  isCompareVisible = false;
  maxCompareItems = 3;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadRestaurants();
    this.handleRouteParams();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleRouteParams() {
    // Escutar mudanças nos query parameters
    const routeSubscription = this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        // Aplicar filtro de categoria se fornecido na URL
        this.restaurantService.filterByCategory(category);
      }
    });

    this.subscriptions.push(routeSubscription);
  }

  private loadRestaurants() {
    // Subscrever aos restaurantes totais
    const restaurantsSubscription = this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.totalRestaurants = restaurants.length;
      this.isLoading = false;
    });

    // Subscrever aos restaurantes filtrados
    const filteredSubscription = this.restaurantService.getFilteredRestaurants().subscribe(restaurants => {
      this.filteredRestaurants = restaurants;
      this.isLoading = false;
    });

    this.subscriptions.push(restaurantsSubscription, filteredSubscription);
  }

  onCategorySelected(category: string) {
    console.log('Categoria selecionada:', category);
  }

  onSearchChanged(searchTerm: string) {
    console.log('Busca alterada:', searchTerm);
  }

  onFavoriteToggled(event: {id: string, isFavorite: boolean}) {
    this.restaurantService.toggleFavorite(event.id);
    console.log('Favorito alterado:', event);
  }

  onRestaurantViewed(restaurantId: string) {
    console.log('Restaurante visualizado:', restaurantId);
    // Implementar navegação para detalhes do restaurante
  }

  clearAllFilters() {
    this.restaurantService.filterByCategory('');
    this.restaurantService.searchRestaurants('');
  }

  getOpenRestaurantsCount(): number {
    return this.filteredRestaurants.filter(r => r.isOpen).length;
  }

  getFreeDeliveryCount(): number {
    return this.filteredRestaurants.filter(r => r.deliveryFee === 0).length;
  }

  getAverageRating(): string {
    if (this.filteredRestaurants.length === 0) return '0.0';
    
    const totalRating = this.filteredRestaurants.reduce((sum, r) => sum + r.rating, 0);
    const average = totalRating / this.filteredRestaurants.length;
    return average.toFixed(1);
  }

  // Métodos do sistema de comparação
  onCompareToggled(event: {id: string, isSelected: boolean}) {
    const restaurant = this.filteredRestaurants.find(r => r.id === event.id);
    if (!restaurant) return;

    if (event.isSelected) {
      // Verificar limite máximo
      if (this.selectedRestaurants.length >= this.maxCompareItems) {
        // Mostrar mensagem de limite (pode ser implementado com toast/snackbar)
        console.warn(`Máximo de ${this.maxCompareItems} restaurantes podem ser comparados`);
        return;
      }
      
      // Adicionar à comparação
      this.selectedRestaurants.push(restaurant);
    } else {
      // Remover da comparação
      this.selectedRestaurants = this.selectedRestaurants.filter(r => r.id !== event.id);
    }

    // Mostrar/ocultar painel de comparação
    this.isCompareVisible = this.selectedRestaurants.length > 0;
  }

  onRemoveFromCompare(restaurantId: string) {
    this.selectedRestaurants = this.selectedRestaurants.filter(r => r.id !== restaurantId);
    this.isCompareVisible = this.selectedRestaurants.length > 0;
  }

  onClearAllCompare() {
    this.selectedRestaurants = [];
    this.isCompareVisible = false;
  }

  onCloseCompare() {
    this.isCompareVisible = false;
  }

  isRestaurantSelected(restaurantId: string): boolean {
    return this.selectedRestaurants.some(r => r.id === restaurantId);
  }

  getCompareButtonText(): string {
    const count = this.selectedRestaurants.length;
    if (count === 0) return 'Comparar';
    if (count === 1) return 'Comparar (1)';
    return `Comparar (${count})`;
  }
}

