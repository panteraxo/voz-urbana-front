export interface Usuario {
  id: number;
  municipalidad_id: number;
  username: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}