import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Output() loginModalRequested = new EventEmitter<void>();
  @Output() registerModalRequested = new EventEmitter<void>();
  
  isMenuOpen = false;
  searchTerm = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Pesquisando por:', this.searchTerm);
      // Implementar lógica de pesquisa
    }
  }

  openLoginModal() {
    this.loginModalRequested.emit();
  }

  openRegisterModal() {
    this.registerModalRequested.emit();
  }
}

