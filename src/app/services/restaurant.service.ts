import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../components/restaurant-card/restaurant-card';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantsSubject = new BehaviorSubject<Restaurant[]>([]);
  public restaurants$ = this.restaurantsSubject.asObservable();

  private filteredRestaurantsSubject = new BehaviorSubject<Restaurant[]>([]);
  public filteredRestaurants$ = this.filteredRestaurantsSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<string>('');
  public selectedCategory$ = this.selectedCategorySubject.asObservable();

  private allRestaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {
    this.loadRestaurants();
  }

  private loadRestaurants() {
    this.http.get<Restaurant[]>('assets/data/restaurants.json').subscribe({
      next: (restaurants) => {
        this.allRestaurants = restaurants;
        this.restaurantsSubject.next(this.allRestaurants);
        this.filteredRestaurantsSubject.next(this.allRestaurants);
      },
      error: (error) => {
        console.error('Erro ao carregar restaurantes:', error);
        // Fallback para dados gerados
        this.allRestaurants = this.generateRestaurantData();
        this.restaurantsSubject.next(this.allRestaurants);
        this.filteredRestaurantsSubject.next(this.allRestaurants);
      }
    });
  }

  private generateRestaurantData(): Restaurant[] {
    // Dados completos com todas as categorias
    const categories = {
      'Pizza': {
        count: 45,
        names: [
          'Pizza Suprema', 'Bella Napoli', 'Pizza Express', 'Mama Mia Pizzaria', 'Pizza Palace',
          'Forno di Roma', 'Pizza Artesanal', 'La Bella Pizza', 'Pizza Gourmet', 'Pizzaria do Bairro',
          'Pizza & Cia', 'Sabor Italiano', 'Pizza Prime', 'Nonna Rosa', 'Pizza Station',
          'Pizzaria Central', 'Pizza Master', 'Forno Italiano', 'Pizza Delícia', 'Villa Pizza',
          'Pizza Corner', 'Pizzaria Moderna', 'Pizza Tradicional', 'Forno & Sabor', 'Pizza House',
          'Pizzaria Popular', 'Pizza Especial', 'Forno Artesanal', 'Pizza da Vila', 'Pizzaria Elite',
          'Pizza Família', 'Forno Gourmet', 'Pizza Delivery', 'Pizzaria do Chef', 'Pizza & Massa',
          'Forno Napoletano', 'Pizza Caseira', 'Pizzaria Premium', 'Pizza Rápida', 'Forno da Esquina',
          'Pizza Perfeita', 'Pizzaria Italiana', 'Pizza & Sabor', 'Forno Tradicional', 'Pizza Mania'
        ],
        specialties: [
          'Pizza Margherita', 'Calabresa', 'Portuguesa', 'Quatro Queijos', 'Pepperoni',
          'Frango com Catupiry', 'Napolitana', 'Vegetariana', 'Bacon', 'Atum'
        ],
        images: [
          'assets/images/restaurants/pizza1.jpg',
          'assets/images/restaurants/pizza2.jpg',
          'assets/images/restaurants/pizza3.png',
          'assets/images/restaurants/pizza4.jpg',
          'assets/images/restaurants/pizza5.jpg',
          'assets/images/restaurants/pizza6.jpg',
          'assets/images/restaurants/pizza7.jpg',
          'assets/images/restaurants/pizza8.jpg',
          'assets/images/restaurants/pizza9.jpg',
          'assets/images/restaurants/pizza10.png',
          'assets/images/restaurants/pizza11.jpg',
          'assets/images/restaurants/pizza12.jpg',
          'assets/images/restaurants/pizza13.jpg',
          'assets/images/restaurants/pizza14.jpg',
          'assets/images/restaurants/pizza15.jpg',
          'assets/images/restaurants/pizza16.jpg',
          'assets/images/restaurants/pizza17.jpg',
          'assets/images/restaurants/pizza18.jpg',
          'assets/images/restaurants/pizza19.jpg',
          'assets/images/restaurants/pizza20.png',
          'assets/images/restaurants/pizza21.jpg',
          'assets/images/restaurants/pizza22.jpg',
          'assets/images/restaurants/pizza23.jpg',
          'assets/images/restaurants/pizza24.png',
          'assets/images/restaurants/pizza25.jpg',
          'assets/images/restaurants/pizza26.jpg',
          'assets/images/restaurants/pizza27.jpg',
          'assets/images/restaurants/pizza28.jpg',
          'assets/images/restaurants/pizza29.jpg',
          'assets/images/restaurants/pizza30.jpg',
          'assets/images/restaurants/pizza31.webp',
          'assets/images/restaurants/pizza32.jpg',
          'assets/images/restaurants/pizza33.jpg',
          'assets/images/restaurants/pizza34.jpg',
          'assets/images/restaurants/pizza35.jpg',
          'assets/images/restaurants/pizza36.jpg',
          'assets/images/restaurants/pizza37.jpg',
          'assets/images/restaurants/pizza38.jpg',
          'assets/images/restaurants/pizza39.jpg',
          'assets/images/restaurants/pizza40.jpg',
          'assets/images/restaurants/pizza41.jpg',
          'assets/images/restaurants/pizza42.jpg',
          'assets/images/restaurants/pizza43.jpg',
          'assets/images/restaurants/pizza44.jpg',
          'assets/images/restaurants/pizza45.jpg'
        ]
      },
      'Hambúrguer': {
        count: 32,
        names: [
          'Burger House', 'The Burger', 'Burger King Local', 'Smash Burger', 'Burger Station',
          'Prime Burger', 'Burger Gourmet', 'Classic Burger', 'Burger Express', 'The Burger Joint',
          'Burger Master', 'Artisan Burger', 'Burger Corner', 'Urban Burger', 'Burger Factory',
          'The Burger Co', 'Burger Deluxe', 'Street Burger', 'Burger Palace', 'Gourmet Burgers',
          'Burger Central', 'The Burger Bar', 'Burger Craft', 'Premium Burger', 'Burger Zone',
          'The Burger Shop', 'Burger Elite', 'Burger & Fries', 'The Burger Place', 'Burger Mania',
          'Burger Supreme', 'The Burger Hub'
        ],
        specialties: [
          'Burger Clássico', 'Bacon Burger', 'Cheeseburger', 'Veggie Burger', 'BBQ Burger',
          'Chicken Burger', 'Fish Burger', 'Double Burger', 'Mushroom Burger', 'Spicy Burger'
        ],
        images: [
          'assets/images/restaurants/burger1.jpg',
          'assets/images/restaurants/burger2.jpg',
          'assets/images/restaurants/burger3.jpg',
          'assets/images/restaurants/burger4.jpg',
          'assets/images/restaurants/burger5.jpg',
          'assets/images/restaurants/burger6.jpg',
          'assets/images/restaurants/burger7.jpg',
          'assets/images/restaurants/burger8.jpg',
          'assets/images/restaurants/burger9.jpg',
          'assets/images/restaurants/burger10.jpg',
          'assets/images/restaurants/burger11.jpg',
          'assets/images/restaurants/burger12.jpg',
          'assets/images/restaurants/burger13.jpg',
          'assets/images/restaurants/burger14.jpg',
          'assets/images/restaurants/burger15.jpg',
          'assets/images/restaurants/burger16.jpg',
          'assets/images/restaurants/burger17.jpg',
          'assets/images/restaurants/burger18.jpg',
          'assets/images/restaurants/burger19.png',
          'assets/images/restaurants/burger20.jpg',
          'assets/images/restaurants/burger21.png',
          'assets/images/restaurants/burger22.jpg',
          'assets/images/restaurants/burger23.jpg',
          'assets/images/restaurants/burger24.jpg',
          'assets/images/restaurants/burger25.jpg',
          'assets/images/restaurants/burger26.jpg',
          'assets/images/restaurants/burger27.jpeg',
          'assets/images/restaurants/burger28.jpg',
          'assets/images/restaurants/burger29.jpg',
          'assets/images/restaurants/burger30.jpg',
          'assets/images/restaurants/burger31.jpg',
          'assets/images/restaurants/burger32.jpg'
        ]
      },
      'Japonesa': {
        count: 18,
        names: [
          'Sushi Zen', 'Sakura Sushi', 'Tokyo Sushi', 'Sushi Bar', 'Yamato Sushi',
          'Sushi House', 'Kyoto Sushi', 'Sushi Express', 'Nagoya Sushi', 'Sushi Master',
          'Osaka Sushi', 'Sushi Garden', 'Hiroshi Sushi', 'Sushi Palace', 'Kenzo Sushi',
          'Sushi Station', 'Takeshi Sushi', 'Sushi Corner'
        ],
        specialties: [
          'Sashimi', 'Temaki', 'Hot Roll', 'Uramaki', 'Nigiri',
          'Yakisoba', 'Tempurá', 'Sunomono', 'Gyoza', 'Teriyaki'
        ],
        images: [
          'assets/images/restaurants/japanese1.jpg',
          'assets/images/restaurants/japanese2.jpg',
          'assets/images/restaurants/japanese3.jpg',
          'assets/images/restaurants/japanese4.jpeg',
          'assets/images/restaurants/japanese5.jpg',
          'assets/images/restaurants/japanese6.jpg',
          'assets/images/restaurants/japanese7.jpg',
          'assets/images/restaurants/japanese8.jpeg',
          'assets/images/restaurants/japanese9.jpg',
          'assets/images/restaurants/japanese10.jpg',
          'assets/images/restaurants/japanese11.jpg',
          'assets/images/restaurants/japanese12.jpg',
          'assets/images/restaurants/japanese13.jpg',
          'assets/images/restaurants/japanese14.jpg',
          'assets/images/restaurants/japanese15.jpg',
          'assets/images/restaurants/japanese16.jpg',
          'assets/images/restaurants/japanese17.jpg',
          'assets/images/restaurants/japanese18.png',
          'assets/images/restaurants/japanese19.jpg',
          'assets/images/restaurants/japanese20.jpg',
          'assets/images/restaurants/japanese21.jpg',
          'assets/images/restaurants/japanese22.jpg',
          'assets/images/restaurants/japanese23.webp',
          'assets/images/restaurants/japanese24.jpg',
          'assets/images/restaurants/japanese25.jpg',
          'assets/images/restaurants/japanese26.jpg',
          'assets/images/restaurants/japanese27.jpg',
          'assets/images/restaurants/japanese28.jpg',
          'assets/images/restaurants/japanese29.jpg',
          'assets/images/restaurants/japanese30.jpg',
          'assets/images/restaurants/japanese31.jpg',
          'assets/images/restaurants/japanese32.jpg'
        ]
      },
      'Italiana': {
        count: 28,
        names: [
          'Nonna Italiana', 'Bella Italia', 'Pasta & Basta', 'Il Forno', 'Trattoria Roma',
          'Pasta House', 'Villa Italiana', 'La Tavola', 'Pasta Express', 'Cucina Italiana',
          'Mama Rosa', 'Pasta Palace', 'Il Giardino', 'Trattoria Moderna', 'Pasta & Vino',
          'La Bella Vita', 'Pasta Corner', 'Il Sapore', 'Trattoria Central', 'Pasta Gourmet',
          'La Nonna', 'Pasta Station', 'Il Gusto', 'Trattoria Elite', 'Pasta & Amore',
          'La Famiglia', 'Pasta Master', 'Il Forno Antico'
        ],
        specialties: [
          'Spaghetti Carbonara', 'Lasanha', 'Fettuccine Alfredo', 'Ravioli', 'Gnocchi',
          'Penne Arrabbiata', 'Risotto', 'Cannelloni', 'Linguine', 'Tortellini'
        ],
        images: [
          'assets/images/restaurants/italian1.jpg',
          'assets/images/restaurants/italian2.jpeg',
          'assets/images/restaurants/italian3.jpg',
          'assets/images/restaurants/italian4.jpeg',
          'assets/images/restaurants/italian5.jpg',
          'assets/images/restaurants/italian6.jpg',
          'assets/images/restaurants/italian7.jpg',
          'assets/images/restaurants/italian8.jpg',
          'assets/images/restaurants/italian9.jpg',
          'assets/images/restaurants/italian10.jpg',
          'assets/images/restaurants/italian11.jpg',
          'assets/images/restaurants/italian12.jpg',
          'assets/images/restaurants/italian13.jpg',
          'assets/images/restaurants/italian14.jpg',
          'assets/images/restaurants/italian15.jpg',
          'assets/images/restaurants/italian16.jpg',
          'assets/images/restaurants/italian17.jpg',
          'assets/images/restaurants/italian18.jpg',
          'assets/images/restaurants/italian19.jpg',
          'assets/images/restaurants/italian20.jpg',
          'assets/images/restaurants/italian21.jpg',
          'assets/images/restaurants/italian22.jpg',
          'assets/images/restaurants/italian23.jpg',
          'assets/images/restaurants/italian24.jpg',
          'assets/images/restaurants/italian25.jpg',
          'assets/images/restaurants/italian26.jpg',
          'assets/images/restaurants/italian27.jpg',
          'assets/images/restaurants/italian28.jpg'
        ]
      },
      'Sobremesas': {
        count: 22,
        names: [
          'Doce Tentação', 'Sweet Dreams', 'Confeitaria Delícia', 'Açúcar & Mel', 'Doce Vida',
          'Sweet Corner', 'Confeitaria Artesanal', 'Doce Sabor', 'Sweet House', 'Confeitaria Premium',
          'Doce Mania', 'Sweet Palace', 'Confeitaria Gourmet', 'Doce Encanto', 'Sweet Station',
          'Confeitaria Central', 'Doce Paixão', 'Sweet Garden', 'Confeitaria Moderna', 'Doce Arte',
          'Sweet Express', 'Confeitaria Elite'
        ],
        specialties: [
          'Brigadeiro Gourmet', 'Cheesecake', 'Tiramisu', 'Brownie', 'Mousse de Chocolate',
          'Torta de Limão', 'Pudim', 'Sorvete Artesanal', 'Cupcake', 'Açaí'
        ],
        images: [
          'assets/images/restaurants/dessert1.jpg',
          'assets/images/restaurants/dessert2.jpg',
          'assets/images/restaurants/dessert3.jpg',
          'assets/images/restaurants/dessert4.jpg',
          'assets/images/restaurants/dessert5.jpg',
          'assets/images/restaurants/dessert6.jpg',
          'assets/images/restaurants/dessert7.jpg',
          'assets/images/restaurants/dessert8.jpg',
          'assets/images/restaurants/dessert9.jpg',
          'assets/images/restaurants/dessert10.jpg',
          'assets/images/restaurants/dessert11.jpg',
          'assets/images/restaurants/dessert12.jpg',
          'assets/images/restaurants/dessert13.jpg',
          'assets/images/restaurants/dessert14.jpg',
          'assets/images/restaurants/dessert15.jpg',
          'assets/images/restaurants/dessert16.jpg',
          'assets/images/restaurants/dessert17.jpg',
          'assets/images/restaurants/dessert18.jpg',
          'assets/images/restaurants/dessert19.png',
          'assets/images/restaurants/dessert20.jpg',
          'assets/images/restaurants/dessert21.jpg',
          'assets/images/restaurants/dessert22.jpg',
          'assets/images/restaurants/dessert23.jpg',
          'assets/images/restaurants/dessert24.jpg',
          'assets/images/restaurants/dessert25.jpg',
          'assets/images/restaurants/dessert26.jpg',
          'assets/images/restaurants/dessert27.jpg',
          'assets/images/restaurants/dessert28.jpg',
          'assets/images/restaurants/dessert29.jpg',
          'assets/images/restaurants/dessert30.jpg',
          'assets/images/restaurants/dessert31.jpg',
          'assets/images/restaurants/dessert32.jpg'
        ]
      },
      'Saudável': {
        count: 15,
        names: [
          'Green Life', 'Vida Saudável', 'Natural Food', 'Fit Kitchen', 'Healthy Corner',
          'Green Garden', 'Vida Natural', 'Fit Food', 'Healthy House', 'Green Station',
          'Natural Kitchen', 'Fit Corner', 'Healthy Garden', 'Green Palace', 'Vida Fit'
        ],
        specialties: [
          'Salada Caesar', 'Bowl de Açaí', 'Wrap Integral', 'Smoothie Verde', 'Quinoa Bowl',
          'Salada de Frutas', 'Suco Detox', 'Sanduíche Natural', 'Salada Proteica', 'Bowl Vegano'
        ],
        images: [
          'assets/images/restaurants/healthy1.jpg',
          'assets/images/restaurants/healthy2.jpg',
          'assets/images/restaurants/healthy3.jpg',
          'assets/images/restaurants/healthy4.jpg',
          'assets/images/restaurants/healthy5.jpg',
          'assets/images/restaurants/healthy6.jpg',
          'assets/images/restaurants/healthy7.jpg',
          'assets/images/restaurants/healthy8.jpg',
          'assets/images/restaurants/healthy9.jpg',
          'assets/images/restaurants/healthy10.jpg',
          'assets/images/restaurants/healthy11.jpg',
          'assets/images/restaurants/healthy12.jpg',
          'assets/images/restaurants/healthy13.jpg',
          'assets/images/restaurants/healthy14.jpg',
          'assets/images/restaurants/healthy15.jpg',
          'assets/images/restaurants/healthy16.jpg',
          'assets/images/restaurants/healthy17.jpg',
          'assets/images/restaurants/healthy18.jpg',
          'assets/images/restaurants/healthy19.jpg',
          'assets/images/restaurants/healthy20.jpg',
          'assets/images/restaurants/healthy21.jpg',
          'assets/images/restaurants/healthy22.jpg',
          'assets/images/restaurants/healthy23.jpg',
          'assets/images/restaurants/healthy24.jpg',
          'assets/images/restaurants/healthy25.jpg',
          'assets/images/restaurants/healthy26.jpg',
          'assets/images/restaurants/healthy27.jpg',
          'assets/images/restaurants/healthy28.jpg',
          'assets/images/restaurants/healthy29.jpg',
          'assets/images/restaurants/healthy30.webp',
          'assets/images/restaurants/healthy31.jpg'
        ]
      }
    };

    const restaurants: Restaurant[] = [];
    let restaurantId = 1;

    Object.entries(categories).forEach(([category, data]) => {
      for (let i = 0; i < data.count; i++) {
        const name = data.names[i] || `${data.names[i % data.names.length]} ${Math.floor(i / data.names.length) + 1}`;
        
        const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
        const reviewCount = Math.floor(Math.random() * 450) + 50;
        const deliveryTimeMin = Math.floor(Math.random() * 10) + 15;
        const deliveryTimeMax = deliveryTimeMin + Math.floor(Math.random() * 20) + 10;
        const minOrder = Math.round((Math.random() * 25 + 15) * 100) / 100;
        const deliveryFee = Math.random() > 0.3 ? Math.round(Math.random() * 12.99 * 100) / 100 : 0;
        const isOpen = Math.random() > 0.2;
        const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 10 : undefined;
        
        const numSpecialties = Math.floor(Math.random() * 3) + 3;
        const shuffled = [...data.specialties].sort(() => 0.5 - Math.random());
        const specialties = shuffled.slice(0, Math.min(numSpecialties, data.specialties.length));
        
        // Garantir que cada restaurante tenha uma imagem única baseada no índice
        const imageIndex = i % data.images.length;
        const image = data.images[imageIndex];
        
        const restaurant: Restaurant = {
          id: restaurantId.toString(),
          name,
          category,
          image: image,
          rating,
          reviewCount,
          deliveryTime: `${deliveryTimeMin}-${deliveryTimeMax} min`,
          minOrder,
          deliveryFee,
          isOpen,
          isFavorite: false,
          specialties
        };
        
        if (discount) {
          restaurant.discount = discount;
        }
        
        restaurants.push(restaurant);
        restaurantId++;
      }
    });

    return restaurants;
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.restaurants$;
  }

  getFilteredRestaurants(): Observable<Restaurant[]> {
    return this.filteredRestaurants$;
  }

  getRestaurantById(id: string): Observable<Restaurant | null> {
    const restaurant = this.allRestaurants.find(restaurant => restaurant.id === id);
    return of(restaurant || null);
  }

  filterByCategory(category: string): void {
    this.selectedCategorySubject.next(category);
    
    if (!category || category === 'all') {
      this.filteredRestaurantsSubject.next(this.allRestaurants);
    } else {
      const filtered = this.allRestaurants.filter(restaurant => 
        restaurant.category.toLowerCase() === category.toLowerCase()
      );
      this.filteredRestaurantsSubject.next(filtered);
    }
  }

  searchRestaurants(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredRestaurantsSubject.next(this.allRestaurants);
      return;
    }

    const filtered = this.allRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    this.filteredRestaurantsSubject.next(filtered);
  }

  toggleFavorite(restaurantId: string): void {
    const restaurant = this.allRestaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      this.restaurantsSubject.next([...this.allRestaurants]);
      
      const currentCategory = this.selectedCategorySubject.value;
      if (currentCategory && currentCategory !== 'all') {
        this.filterByCategory(currentCategory);
      } else {
        this.filteredRestaurantsSubject.next([...this.allRestaurants]);
      }
    }
  }

  getCategories(): string[] {
    const categories = [...new Set(this.allRestaurants.map(r => r.category))];
    return categories.sort();
  }

  getCategoryCount(category: string): number {
    return this.allRestaurants.filter(r => r.category === category).length;
  }

  getSelectedCategory(): Observable<string> {
    return this.selectedCategory$;
  }
}

