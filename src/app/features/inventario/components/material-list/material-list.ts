import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MaterialMock {
  id: number;
  nombre_item: string;
  stock: number;
}

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.html',
  styleUrls: ['./material-list.css']
})
export class MaterialListComponent implements OnInit {
  materiales: MaterialMock[] = [];
  municipioActual = 'San Isidro (ID: 101)';

  ngOnInit(): void {
    this.cargarMocks();
  }

  private cargarMocks(): void {
    this.materiales = [
      { id: 203, nombre_item: 'Arena 05 (Sacos)', stock: 150 },
      { id: 204, nombre_item: 'Cemento Gris Tipo I', stock: 80 },
      { id: 205, nombre_item: 'Pintura Tráfico Amarilla', stock: 15 },
      { id: 206, nombre_item: 'Asfalto en frío (Galones)', stock: 200 },
      { id: 207, nombre_item: 'Ladrillos de concreto', stock: 500 },
      { id: 208, nombre_item: 'Grava de 1/2 pulgada', stock: 8 }
    ];
  }

  esStockCritico(stock: number): boolean {
    return stock < 20;
  }
}