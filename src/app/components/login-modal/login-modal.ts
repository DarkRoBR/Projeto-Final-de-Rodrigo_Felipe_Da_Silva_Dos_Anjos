import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RegisterData } from '../../services/auth';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.scss']
})
export class LoginModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<any>();
  @Output() registerSuccess = new EventEmitter<any>();

  activeTab: 'login' | 'register' = 'login';
  showPassword = false;
  isLoading = false;
  
  // Toast notifications
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    // Formulário de Login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulário de Cadastro
    this.registerForm = this.fb.group({
      userType: ['customer', Validators.required],
      name: ['', Validators.required],
      restaurantName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Adicionar validação condicional para nome do restaurante
    this.registerForm.get('userType')?.valueChanges.subscribe(userType => {
      const restaurantNameControl = this.registerForm.get('restaurantName');
      if (userType === 'restaurant') {
        restaurantNameControl?.setValidators([Validators.required]);
      } else {
        restaurantNameControl?.clearValidators();
      }
      restaurantNameControl?.updateValueAndValidity();
    });
  }

  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.clearForms();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      try {
        const { email, password } = this.loginForm.value;
        const user = await this.authService.login(email, password);
        
        this.showSuccessToast('Login realizado com sucesso!');
        this.loginSuccess.emit(user);
        this.closeModal();
      } catch (error: any) {
        this.showErrorToast(error.message);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onRegister() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      try {
        const formData = this.registerForm.value;
        const registerData: RegisterData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          userType: formData.userType,
          restaurantName: formData.restaurantName,
          phone: formData.phone
        };

        const user = await this.authService.register(registerData);
        
        this.showSuccessToast('Conta criada com sucesso!');
        this.registerSuccess.emit(user);
        this.closeModal();
      } catch (error: any) {
        this.showErrorToast(error.message);
      } finally {
        this.isLoading = false;
      }
    }
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.clearForms();
    this.activeTab = 'login';
  }

  private clearForms() {
    this.loginForm.reset();
    this.registerForm.reset({
      userType: 'customer',
      acceptTerms: false
    });
    this.showPassword = false;
  }

  private showSuccessToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'success';
    this.showToast = true;
    setTimeout(() => this.hideToast(), 5000);
  }

  private showErrorToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'error';
    this.showToast = true;
    setTimeout(() => this.hideToast(), 5000);
  }

  hideToast() {
    this.showToast = false;
  }
}

