import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface IncidenciaMock {
  id: number;
  descripcion: string;
  estado: 'PENDIENTE' | 'RESUELTO';
  url_foto: string;
}

export interface MaterialMock {
  id: number;
  codigo: string;
  nombre: string;
  stockActual: number;
}

@Component({
  selector: 'app-incidencia-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './incidencia-list.html',
  styleUrls: ['./incidencia-list.css']
})
export class IncidenciaListComponent implements OnInit {
  incidencias: IncidenciaMock[] = [];
  municipioActual = 'San Isidro (ID: 101)';

  materiales: MaterialMock[] = [];
  panelCierreAbierto: boolean = false;
  incidenciaSeleccionada: IncidenciaMock | null = null;
  cierreForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarMocks();
    this.initForm();
  }

  private cargarMocks(): void {
    this.incidencias = [
      { id: 1, descripcion: 'Bache en Av. Larco', estado: 'PENDIENTE', url_foto: 'assets/bache.jpg' },
      { id: 2, descripcion: 'Luminaria rota', estado: 'PENDIENTE', url_foto: 'assets/luz.jpg' },
      { id: 3, descripcion: 'Semáforo averiado', estado: 'RESUELTO', url_foto: 'assets/semaforo.jpg' },
      { id: 4, descripcion: 'Árbol caído', estado: 'PENDIENTE', url_foto: 'assets/arbol.jpg' },
      { id: 5, descripcion: 'Vereda dañada', estado: 'RESUELTO', url_foto: 'assets/vereda.jpg' },
      { id: 6, descripcion: 'Alcantarilla tapada', estado: 'PENDIENTE', url_foto: 'assets/alcantarilla.jpg' }
    ];

    this.materiales = [
      { id: 203, codigo: 'MAT-203', nombre: 'Arena 05', stockActual: 150 },
      { id: 204, codigo: 'MAT-204', nombre: 'Cemento Gris Tipo I', stockActual: 80 },
      { id: 205, codigo: 'MAT-205', nombre: 'Pintura Tráfico', stockActual: 45 }
    ];
  }

  private initForm(): void {
    this.cierreForm = this.fb.group({
      estado: ['RESUELTO', Validators.required],
      materialId: ['', Validators.required],
      cantidadUsada: [1, [Validators.required, Validators.min(1)]]
    });
  }

  abrirPanelCierre(incidencia: IncidenciaMock): void {
    this.incidenciaSeleccionada = incidencia;
    this.cierreForm.reset({ estado: 'RESUELTO', materialId: '', cantidadUsada: 1 });
    this.panelCierreAbierto = true;
  }

  cerrarPanel(): void {
    this.panelCierreAbierto = false;
    this.incidenciaSeleccionada = null;
  }

  onSubmitCierre(): void {
    if (this.cierreForm.invalid) return;
    
    if (this.incidenciaSeleccionada) {
      this.incidenciaSeleccionada.estado = 'RESUELTO';
    }
    this.cerrarPanel();
  }
}