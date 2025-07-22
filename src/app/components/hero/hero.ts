import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent {
  searchQuery = '';

  onHeroSearch() {
    if (this.searchQuery.trim()) {
      console.log('Pesquisa do hero:', this.searchQuery);
      // Implementar navegação para página de resultados
    }
  }
}

