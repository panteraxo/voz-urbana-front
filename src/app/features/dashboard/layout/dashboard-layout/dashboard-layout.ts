import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class DashboardLayoutComponent {
  municipioNombre: string = 'San Isidro (ID: 101)';
  usuarioUsername: string = 'Johelyn_Analist';
  usuarioRol: string = 'Coordinador Municipal';

  constructor(private router: Router) {}

  logout(): void {
    console.log('Cerrando sesión en modo maqueta...');
    this.router.navigate(['/login']);
  }
}