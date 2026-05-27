export type EstadoIncidencia = 'PENDIENTE' | 'RESUELTO';

export interface Incidencia {
  id: number;
  municipalidad_id: number;
  descripcion: string;
  estado: EstadoIncidencia;
  url_foto: string;
  
  material_id: number | null;
  cantidad_usada: number | null;
}

export interface ResolverIncidenciaDTO {
  material_id: number;
  cantidad_usada: number;
}