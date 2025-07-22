import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RestaurantsComponent } from './pages/restaurants/restaurants';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantsComponent },
  { path: 'restaurante/:id', component: RestaurantDetailsComponent },
  { path: '**', redirectTo: '' }
];

