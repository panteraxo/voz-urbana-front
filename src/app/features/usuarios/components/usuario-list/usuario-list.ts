import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-list.html',
  styleUrls: ['./usuario-list.css']
})
export class UsuarioListComponent implements OnInit {
  usuarios: any[] = [];
  municipioActual = '';
  
  panelAbierto = false;
  modoEdicion = false;
  usuarioSeleccionado: any | null = null;
  
  usuarioForm!: FormGroup;
  buscarForm!: FormGroup;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.municipioActual = `ID: ${localStorage.getItem('municipalidadId')}`;
    this.initForm();
    this.cargarUsuarios();
  }

  private initForm(): void {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['CLIENT', Validators.required]
    });

    this.buscarForm = this.fb.group({
      idBuscado: ['']
    });
  }

  private cargarUsuarios(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  buscarUsuario(): void {
    const id = this.buscarForm.value.idBuscado;
    
    if (!id) {
      this.cargarUsuarios();
      return;
    }

    this.userService.getById(id).subscribe({
      next: (data) => {
        this.usuarios = data ? [data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.usuarios = [];
        this.cdr.detectChanges();
      }
    });
  }

  limpiarBusqueda(): void {
    this.buscarForm.reset();
    this.cargarUsuarios();
  }

  abrirPanel(usuario?: any): void {
    console.log('Usuario recibido en abrirPanel:', usuario); // <-- ESTO NOS DIRÁ LA VERDAD
    
    if (usuario && usuario.usuario_id) {
      this.modoEdicion = true;
      this.usuarioSeleccionado = usuario;
      console.log('Modo Edición activado para ID:', usuario.id); // <-- PARA VERIFICAR
      
      this.usuarioForm.patchValue({
        username: usuario.username,
        password: '',
        rol: usuario.rol
      });
      this.usuarioForm.get('password')?.clearValidators();
    } else {
      this.modoEdicion = false;
      this.usuarioSeleccionado = null;
      console.log('Modo Registro (Crear) activado');
      
      this.usuarioForm.reset({ username: '', password: '', rol: 'CLIENT' });
      this.usuarioForm.get('password')?.setValidators(Validators.required);
    }
    
    this.usuarioForm.get('password')?.updateValueAndValidity();
    this.panelAbierto = true;
  }

  cerrarPanel(): void {
    this.panelAbierto = false;
    this.usuarioSeleccionado = null;
    this.modoEdicion = false;
  }

  onSubmitUsuario(): void {
    // Si estamos creando, el form debe ser válido. Si editamos, permitimos password vacío.
    if (this.usuarioForm.invalid && !this.modoEdicion) return;

    const formValues = this.usuarioForm.value;
    
    // FORZAMOS el uso de usuarioSeleccionado.id para el PUT
    if (this.modoEdicion && this.usuarioSeleccionado?.usuario_id) {
      const payload: any = { username: formValues.username, rol: formValues.rol };
      if (formValues.password) payload.password = formValues.password;

      this.userService.update(this.usuarioSeleccionado.usuario_id, payload).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarPanel(); },
        error: (err) => alert('Error al actualizar: ' + err.message)
      });
    } else {
      this.userService.crear(formValues).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarPanel(); },
        error: (err) => alert('Error al registrar: ' + err.message)
      });
    }
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.eliminar(id).subscribe({
        next: () => {
          this.cargarUsuarios();
        },
        error: (err) => {
          alert('Error al eliminar el usuario');
        }
      });
    }
  }
}