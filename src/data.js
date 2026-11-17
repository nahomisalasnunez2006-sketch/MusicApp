// Datos de ejemplo (canciones y artistas inventados)

export const categorias = ['Todas', 'Fiesta', 'Blues', 'Triste', 'Hip Hop'];

export const canciones = [
  { id: '1', titulo: 'Luz de Neon', artista: 'Los Satelites', categoria: 'Fiesta', color: '#1B6B73', icono: 'star-four-points', duracion: 261 },
  { id: '2', titulo: 'Barrio Norte', artista: 'MC Cometa', categoria: 'Hip Hop', color: '#8B1E1E', icono: 'microphone-variant', duracion: 198 },
  { id: '3', titulo: 'Lluvia Azul', artista: 'Rio Lento', categoria: 'Blues', color: '#2B3A8C', icono: 'weather-rainy', duracion: 240 },
  { id: '4', titulo: 'Sin Despedida', artista: 'Marea', categoria: 'Triste', color: '#4A4A4A', icono: 'heart-broken', duracion: 222 },
  { id: '5', titulo: 'Fuego Lento', artista: 'Los Satelites', categoria: 'Fiesta', color: '#C2410C', icono: 'fire', duracion: 205 },
  { id: '6', titulo: 'Calle 23', artista: 'MC Cometa', categoria: 'Hip Hop', color: '#6D28D9', icono: 'city-variant', duracion: 187 },
];

// Tarjetas de "Explora" en la pantalla Buscar
export const explora = [
  { id: 'e1', etiqueta: '#TechnoBeats', color: '#9D174D', icono: 'equalizer' },
  { id: 'e2', etiqueta: '#BluesBeats', color: '#1E3A8A', icono: 'guitar-electric' },
  { id: 'e3', etiqueta: '#FolkTales', color: '#065F46', icono: 'guitar-acoustic' },
  { id: 'e4', etiqueta: '#LoFi', color: '#7C2D12', icono: 'headphones' },
];

// Cuadros de "Estado de animo y generos"
export const generos = [
  { id: 'g1', nombre: 'Hip Hop', color: '#06B6D4', icono: 'microphone' },
  { id: 'g2', nombre: 'Electronica', color: '#A855F7', icono: 'sine-wave' },
  { id: 'g3', nombre: 'Pop', color: '#10B981', icono: 'star' },
  { id: 'g4', nombre: 'Fiesta', color: '#EC4899', icono: 'party-popper' },
  { id: 'g5', nombre: 'Blues', color: '#7C3AED', icono: 'saxophone' },
  { id: 'g6', nombre: 'Techno', color: '#0EA5E9', icono: 'speaker' },
];

// Convierte segundos a formato minutos:segundos (ej. 261 -> "4:21")
export const formatoTiempo = (seg) =>
  `${Math.floor(seg / 60)}:${String(Math.floor(seg % 60)).padStart(2, '0')}`;
