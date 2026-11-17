import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { Text, IconButton, Chip, Button, Card, List } from 'react-native-paper';
import Portada from '../components/Portada';
import { canciones, categorias } from '../data';

// Pantalla 1: saludo, categorias, canciones populares, coleccion y playlist
// "reproducir" viene de App.js: cambia la cancion y abre el Reproductor
export default function InicioScreen({ reproducir }) {
  const [categoria, setCategoria] = useState('Todas');

  // Filtramos las canciones populares segun el Chip seleccionado
  const populares =
    categoria === 'Todas' ? canciones : canciones.filter((c) => c.categoria === categoria);

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={{ padding: 16, paddingTop: 48 }}>
      {/* Encabezado: saludo a la izquierda, botones a la derecha */}
      <View style={styles.encabezado}>
        <Text variant="titleMedium">Hola, Nahomi ✨</Text>
        <View style={{ flexDirection: 'row' }}>
          <IconButton icon="bell-outline" mode="outlined" size={20} onPress={() => {}} />
          <IconButton icon="email-outline" mode="contained" size={20} onPress={() => {}} />
        </View>
      </View>

      {/* Chips: botoncitos redondeados para elegir categoria */}
      <Text variant="titleMedium" style={styles.titulo}>Selecciona una categoria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {categorias.map((c) => (
          <Chip
            key={c}
            selected={categoria === c}
            showSelectedCheck={false}
            mode={categoria === c ? 'flat' : 'outlined'}
            onPress={() => setCategoria(c)}
            style={categoria === c ? styles.chipActivo : null}
            textStyle={categoria === c ? { color: '#000' } : null}
          >
            {c}
          </Chip>
        ))}
      </ScrollView>

      {/* Canciones populares en fila horizontal */}
      <View style={styles.filaTitulo}>
        <Text variant="titleMedium">Canciones populares</Text>
        <Button compact onPress={() => setCategoria('Todas')}>Ver todo</Button>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {populares.map((c) => (
          <Pressable key={c.id} onPress={() => reproducir(c)} style={{ width: 120 }}>
            <Portada color={c.color} icono={c.icono} />
            <Text variant="bodyMedium" style={{ marginTop: 6 }} numberOfLines={1}>{c.titulo}</Text>
            <Text variant="bodySmall" style={styles.gris}>{c.artista}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Nueva coleccion: tarjetas blancas (Card de Paper) */}
      <Text variant="titleMedium" style={styles.titulo}>Nueva coleccion</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        <Card style={[styles.coleccion, { backgroundColor: '#fff' }]} onPress={() => reproducir(canciones[0])}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.textoNegro}>TOP SONGS{'\n'}GLOBAL</Text>
            <Text variant="bodySmall" style={{ color: '#555' }}>Descubre 85 canciones</Text>
            <IconButton icon="arrow-right" iconColor="#000" style={{ marginLeft: -8 }} />
          </Card.Content>
        </Card>
        <Card style={[styles.coleccion, { backgroundColor: '#B9F3F0' }]} onPress={() => reproducir(canciones[2])}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.textoNegro}>PURE{'\n'}SOUL</Text>
            <Text variant="bodySmall" style={{ color: '#555' }}>Descubre 40 canciones</Text>
            <IconButton icon="arrow-right" iconColor="#000" style={{ marginLeft: -8 }} />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Playlist: lista con List.Item de Paper */}
      <View style={styles.filaTitulo}>
        <Text variant="titleMedium">Playlist</Text>
        <Button compact>Ver todo</Button>
      </View>
      {canciones.slice(0, 4).map((c) => (
        <List.Item
          key={c.id}
          title={c.titulo}
          description={c.artista}
          onPress={() => reproducir(c)}
          left={() => <Portada color={c.color} icono={c.icono} tamano={48} radio={8} />}
          right={() => <List.Icon icon="play-circle-outline" />}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0D0D0D' },
  encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titulo: { marginTop: 20, marginBottom: 10 },
  filaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between', // titulo a la izquierda, "Ver todo" a la derecha
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  chipActivo: { backgroundColor: '#C6F432' },
  gris: { color: '#9CA3AF' },
  coleccion: { width: 220, borderRadius: 16 },
  textoNegro: { color: '#000', fontWeight: 'bold' },
});
