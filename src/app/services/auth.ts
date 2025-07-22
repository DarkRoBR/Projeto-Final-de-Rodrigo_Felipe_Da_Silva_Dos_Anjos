import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  userType: 'customer' | 'restaurant';
  restaurantName?: string;
  phone?: string;
  createdAt: Date;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'customer' | 'restaurant';
  restaurantName?: string;
  phone?: string;
}

interface StoredUser extends UserData {
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoadingSubject.asObservable();

  private readonly USERS_KEY = 'foodie_users';
  private readonly CURRENT_USER_KEY = 'foodie_current_user';

  constructor() {
    this.initAuthListener();
  }

  private initAuthListener() {
    // Verifica se há um usuário logado no localStorage
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        this.currentUserSubject.next(userData);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
    this.isLoadingSubject.next(false);
  }

  async register(data: RegisterData): Promise<UserData> {
    try {
      // Validações
      if (!this.isValidEmail(data.email)) {
        throw new Error('Email inválido');
      }

      if (data.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      // Verifica se o email já existe
      const existingUsers = this.getStoredUsers();
      if (existingUsers.some(user => user.email === data.email)) {
        throw new Error('Este email já está sendo usado por outra conta');
      }

      // Cria novo usuário
      const newUser: StoredUser = {
        uid: this.generateUID(),
        email: data.email,
        password: data.password, // Em produção, seria necessário hash da senha
        displayName: data.name,
        userType: data.userType,
        restaurantName: data.restaurantName,
        phone: data.phone,
        createdAt: new Date()
      };

      // Salva o usuário
      existingUsers.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(existingUsers));

      // Remove a senha antes de retornar
      const { password, ...userData } = newUser;
      
      // Define como usuário atual
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
      this.currentUserSubject.next(userData);

      // Se for restaurante, cria entrada na lista de restaurantes
      if (data.userType === 'restaurant' && data.restaurantName) {
        this.createRestaurantEntry(userData);
      }

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Erro no cadastro');
    }
  }

  async login(email: string, password: string): Promise<UserData> {
    try {
      if (!this.isValidEmail(email)) {
        throw new Error('Email inválido');
      }

      const existingUsers = this.getStoredUsers();
      const user = existingUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Email ou senha incorretos');
      }

      // Remove a senha antes de retornar
      const { password: _, ...userData } = user;
      
      // Define como usuário atual
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
      this.currentUserSubject.next(userData);

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Erro no login');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  private getStoredUsers(): StoredUser[] {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      return [];
    }
  }

  private generateUID(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private createRestaurantEntry(userData: UserData) {
    try {
      const restaurants = JSON.parse(localStorage.getItem('foodie_restaurants') || '[]');
      const restaurantData = {
        id: this.generateUID(),
        ownerId: userData.uid,
        name: userData.restaurantName,
        ownerName: userData.displayName,
        email: userData.email,
        phone: userData.phone,
        isActive: true,
        createdAt: new Date()
      };
      restaurants.push(restaurantData);
      localStorage.setItem('foodie_restaurants', JSON.stringify(restaurants));
    } catch (error) {
      console.error('Erro ao criar entrada do restaurante:', error);
    }
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 'customer';
  }

  isRestaurant(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 'restaurant';
  }

  // Método para limpar todos os dados (útil para desenvolvimento/teste)
  clearAllData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem('foodie_restaurants');
    this.currentUserSubject.next(null);
  }

  // Método para listar todos os usuários (útil para desenvolvimento/teste)
  getAllUsers(): UserData[] {
    return this.getStoredUsers().map(({ password, ...user }) => user);
  }
}

