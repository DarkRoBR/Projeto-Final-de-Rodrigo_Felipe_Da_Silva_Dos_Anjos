import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { HeroComponent } from '../../components/hero/hero';
import { RestaurantCardComponent, Restaurant } from '../../components/restaurant-card/restaurant-card';
import { LoginModalComponent } from '../../components/login-modal/login-modal';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface HowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  icon: string;
  number: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    RestaurantCardComponent,
    LoginModalComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  showLoginModal = false;
  newsletterForm!: FormGroup;

  categories: Category[] = [
    { id: 'Pizza', name: 'Pizza', icon: 'fas fa-pizza-slice', color: '#ff6b35', count: 45 },
    { id: 'Hambúrguer', name: 'Hambúrguer', icon: 'fas fa-hamburger', color: '#f7931e', count: 32 },
    { id: 'Comida Japonesa', name: 'Japonesa', icon: 'fas fa-fish', color: '#4ecdc4', count: 18 },
    { id: 'Comida Italiana', name: 'Italiana', icon: 'fas fa-utensils', color: '#e74c3c', count: 28 },
    { id: 'Sobremesas', name: 'Sobremesas', icon: 'fas fa-ice-cream', color: '#9b59b6', count: 22 },
    { id: 'Saudável', name: 'Saudável', icon: 'fas fa-leaf', color: '#27ae60', count: 15 }
  ];

  featuredRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizza Suprema',
      category: 'Pizzaria',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 324,
      deliveryTime: '25-35 min',
      minOrder: 25.00,
      deliveryFee: 0,
      isOpen: true,
      isFavorite: false,
      discount: 15,
      specialties: ['Pizza Margherita', 'Calabresa', 'Portuguesa']
    },
    {
      id: '2',
      name: 'Burger House',
      category: 'Hamburgueria',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 198,
      deliveryTime: '20-30 min',
      minOrder: 20.00,
      deliveryFee: 5.99,
      isOpen: true,
      isFavorite: true,
      specialties: ['Burger Clássico', 'Bacon Burger', 'Veggie Burger']
    },
    {
      id: '3',
      name: 'Sushi Zen',
      category: 'Japonesa',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 156,
      deliveryTime: '30-45 min',
      minOrder: 35.00,
      deliveryFee: 8.99,
      isOpen: false,
      isFavorite: false,
      discount: 20,
      specialties: ['Sashimi', 'Temaki', 'Hot Roll']
    }
  ];

  howItWorksSteps: HowItWorksStep[] = [
    {
      icon: 'fas fa-search',
      title: 'Busque',
      description: 'Encontre restaurantes próximos a você ou pesquise por tipo de comida'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Peça',
      description: 'Escolha seus pratos favoritos e adicione ao carrinho'
    },
    {
      icon: 'fas fa-credit-card',
      title: 'Pague',
      description: 'Pague de forma segura com cartão, PIX ou dinheiro'
    },
    {
      icon: 'fas fa-motorcycle',
      title: 'Receba',
      description: 'Nossos motoboys entregam seu pedido rapidamente'
    }
  ];

  stats: Stat[] = [
    { icon: 'fas fa-store', number: '500+', label: 'Restaurantes Parceiros' },
    { icon: 'fas fa-users', number: '50k+', label: 'Clientes Satisfeitos' },
    { icon: 'fas fa-motorcycle', number: '200+', label: 'Motoboys Ativos' },
    { icon: 'fas fa-clock', number: '25min', label: 'Tempo Médio de Entrega' }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Maria Silva',
      role: 'Cliente Regular',
      text: 'Uso o DeliveryPro há mais de um ano e sempre fico impressionada com a rapidez das entregas e a qualidade dos restaurantes.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'João Santos',
      role: 'Proprietário de Restaurante',
      text: 'Desde que me cadastrei na plataforma, minhas vendas aumentaram 300%. O suporte é excelente e o sistema é muito fácil de usar.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Ana Costa',
      role: 'Motoboy Parceiro',
      text: 'Trabalho como motoboy há 2 anos e posso dizer que é a melhor plataforma. Pagamentos em dia e muitas corridas disponíveis.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeNewsletterForm();
  }

  private initializeNewsletterForm() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  selectCategory(categoryId: string) {
    console.log('Categoria selecionada:', categoryId);
    // Navegar para página de restaurantes com filtro aplicado
    this.router.navigate(['/restaurantes'], { 
      queryParams: { category: categoryId } 
    });
  }

  onFavoriteToggled(event: {id: string, isFavorite: boolean}) {
    const restaurant = this.featuredRestaurants.find(r => r.id === event.id);
    if (restaurant) {
      restaurant.isFavorite = event.isFavorite;
    }
    console.log('Favorito alterado:', event);
  }

  onRestaurantViewed(restaurantId: string) {
    console.log('Restaurante visualizado:', restaurantId);
    // Implementar navegação para detalhes do restaurante
  }

  onNewsletterSubmit() {
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')?.value;
      console.log('Newsletter inscrito:', email);
      // Implementar lógica de inscrição na newsletter
      this.newsletterForm.reset();
    }
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  openLoginModal() {
    this.showLoginModal = true;
  }

  openRegisterModal() {
    this.showLoginModal = true;
    // Implementar lógica para abrir na aba de cadastro
  }

  onLoginSuccess(user: any) {
    console.log('Login realizado com sucesso:', user);
    // Implementar lógica pós-login
  }

  onRegisterSuccess(user: any) {
    console.log('Cadastro realizado com sucesso:', user);
    // Implementar lógica pós-cadastro
  }
}

