import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../components/restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './restaurant-details.html',
  styleUrls: ['./restaurant-details.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRestaurant(id);
    }
  }
  
  private loadRestaurant(id: string): void {
    this.restaurantService.getRestaurantById(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
      error: (error) => {
        console.error('Erro ao carregar restaurante:', error);
      }
    });
  }
}

