import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IncidenciaMock {
  id: number;
  descripcion: string;
  estado: 'PENDIENTE' | 'RESUELTO';
}

@Component({
  selector: 'app-incidencia-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencia-list.html',
  styleUrls: ['./incidencia-list.css']
})
export class IncidenciaListComponent implements OnInit {
  incidencias: IncidenciaMock[] = [];
  municipioActual = 'San Isidro (ID: 101)';

  ngOnInit(): void {
    this.cargarMockData();
  }

  private cargarMockData(): void {
    this.incidencias = [
      { id: 1, descripcion: 'Bache en Av. Larco', estado: 'PENDIENTE' },
      { id: 2, descripcion: 'Luminaria rota', estado: 'PENDIENTE' },
      { id: 3, descripcion: 'Semáforo averiado', estado: 'RESUELTO' },
      { id: 4, descripcion: 'Árbol caído', estado: 'PENDIENTE' },
      { id: 5, descripcion: 'Vereda dañada', estado: 'RESUELTO' },
      { id: 6, descripcion: 'Alcantarilla tapada', estado: 'PENDIENTE' }
    ];
  }
}