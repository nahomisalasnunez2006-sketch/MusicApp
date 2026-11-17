import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, ProgressBar } from 'react-native-paper';
import Portada from '../components/Portada';
import { formatoTiempo } from '../data';

// Pantalla 2: reproductor de la cancion actual
// "cancion" viene de App.js y "regresar" nos manda de vuelta a Inicio
export default function ReproductorScreen({ cancion, regresar }) {
  const [reproduciendo, setReproduciendo] = useState(true);
  const [segundos, setSegundos] = useState(0); // segundos que lleva la cancion
  const [meGusta, setMeGusta] = useState(false);

  // Simulamos que la cancion avanza: cada segundo sumamos 1
  // (no suena de verdad, solo se mueve la barra)
  useEffect(() => {
    if (!reproduciendo) return;
    const intervalo = setInterval(() => {
      setSegundos((s) => (s + 1 >= cancion.duracion ? 0 : s + 1));
    }, 1000);
    // Al pausar o cambiar de pantalla detenemos el contador
    return () => clearInterval(intervalo);
  }, [reproduciendo, cancion]);

  return (
    <View style={styles.pantalla}>
      {/* Barra superior: bajar, nombre del album y menu */}
      <View style={styles.barraSuperior}>
        <IconButton icon="chevron-down" mode="contained" onPress={regresar} />
        <View style={{ alignItems: 'center' }}>
          <Text variant="labelSmall" style={styles.gris}>REPRODUCIENDO DEL ALBUM</Text>
          <Text variant="titleSmall">{cancion.titulo}</Text>
        </View>
        <IconButton icon="dots-vertical" mode="contained" onPress={() => {}} />
      </View>

      {/* Portada grande */}
      <View style={{ alignItems: 'center', marginVertical: 24 }}>
        <Portada color={cancion.color} icono={cancion.icono} tamano={300} radio={20} />
      </View>

      {/* Titulo y artista a la izquierda, corazon a la derecha */}
      <View style={styles.filaInfo}>
        <View>
          <Text variant="titleLarge">{cancion.titulo}</Text>
          <Text variant="bodyMedium" style={styles.gris}>{cancion.artista}</Text>
        </View>
        <IconButton
          icon={meGusta ? 'heart' : 'heart-outline'}
          iconColor={meGusta ? '#C6F432' : '#fff'}
          onPress={() => setMeGusta(!meGusta)}
        />
      </View>

      {/* ProgressBar de Paper: recibe un numero de 0 a 1 */}
      <ProgressBar progress={segundos / cancion.duracion} color="#C6F432" style={styles.barra} />
      <View style={styles.filaInfo}>
        <Text variant="bodySmall" style={styles.gris}>{formatoTiempo(segundos)}</Text>
        <Text variant="bodySmall" style={styles.gris}>{formatoTiempo(cancion.duracion)}</Text>
      </View>

      {/* Controles: aleatorio, anterior, play/pausa, siguiente, repetir */}
      <View style={styles.controles}>
        <IconButton icon="shuffle-variant" onPress={() => {}} />
        <IconButton icon="skip-previous" size={32} onPress={() => setSegundos(0)} />
        <IconButton
          icon={reproduciendo ? 'pause' : 'play'}
          mode="contained"
          containerColor="#C6F432"
          iconColor="#000"
          size={40}
          onPress={() => setReproduciendo(!reproduciendo)}
        />
        <IconButton icon="skip-next" size={32} onPress={() => setSegundos(0)} />
        <IconButton icon="repeat" onPress={() => {}} />
      </View>

      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Text variant="labelMedium">LETRA</Text>
        <IconButton icon="chevron-down" size={18} style={{ margin: 0 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0D0D0D', padding: 16, paddingTop: 48 },
  barraSuperior: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gris: { color: '#9CA3AF' },
  filaInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  barra: { height: 4, borderRadius: 2, marginTop: 12, marginBottom: 6 },
  controles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
