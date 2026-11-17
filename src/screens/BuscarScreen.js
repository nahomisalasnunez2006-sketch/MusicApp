import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Searchbar, Surface, Icon, List, TouchableRipple } from 'react-native-paper';
import Portada from '../components/Portada';
import { canciones, explora, generos } from '../data';

// Pantalla 3: buscador, tarjetas de "Explora" y cuadricula de generos
export default function BuscarScreen({ reproducir }) {
  const [busqueda, setBusqueda] = useState('');

  // Canciones que coinciden con lo escrito (por titulo, artista o categoria)
  const texto = busqueda.toLowerCase();
  const resultados = canciones.filter(
    (c) =>
      c.titulo.toLowerCase().includes(texto) ||
      c.artista.toLowerCase().includes(texto) ||
      c.categoria.toLowerCase().includes(texto)
  );

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={{ padding: 16, paddingTop: 48 }}>
      {/* Searchbar de Paper: ya trae la lupa incluida */}
      <Searchbar placeholder="Busca una cancion" value={busqueda} onChangeText={setBusqueda} />

      {/* Si el usuario escribio algo, mostramos resultados en lugar de lo demas */}
      {busqueda !== '' ? (
        <View style={{ marginTop: 12 }}>
          {resultados.length === 0 && <Text style={styles.gris}>Sin resultados</Text>}
          {resultados.map((c) => (
            <List.Item
              key={c.id}
              title={c.titulo}
              description={c.artista}
              onPress={() => reproducir(c)}
              left={() => <Portada color={c.color} icono={c.icono} tamano={48} radio={8} />}
            />
          ))}
        </View>
      ) : (
        <>
          {/* Explora: tarjetas altas que se deslizan a la derecha */}
          <Text variant="titleMedium" style={styles.titulo}>Explora tu musica</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {explora.map((e) => (
              <Surface key={e.id} style={[styles.explora, { backgroundColor: e.color }]} elevation={2}>
                <Icon source={e.icono} size={48} color="rgba(255,255,255,0.8)" />
                <Text variant="labelMedium" style={styles.etiqueta}>{e.etiqueta}</Text>
              </Surface>
            ))}
          </ScrollView>

          {/* Generos: cuadricula de 2 columnas
              flexWrap wrap hace que los cuadros bajen de linea cuando no caben */}
          <Text variant="titleMedium" style={styles.titulo}>Estado de animo y generos</Text>
          <View style={styles.cuadricula}>
            {generos.map((g) => (
              <TouchableRipple
                key={g.id}
                style={[styles.genero, { backgroundColor: g.color }]}
                onPress={() => setBusqueda(g.nombre)} // busca canciones de ese genero
                borderless
              >
                <View style={styles.contenidoGenero}>
                  <Text variant="titleSmall" style={{ color: '#fff' }}>{g.nombre}</Text>
                  <Icon source={g.icono} size={36} color="rgba(255,255,255,0.85)" />
                </View>
              </TouchableRipple>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0D0D0D' },
  titulo: { marginTop: 20, marginBottom: 10 },
  gris: { color: '#9CA3AF' },
  explora: {
    width: 130,
    height: 170,
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  etiqueta: { color: '#fff' },
  cuadricula: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  genero: { width: '48%', height: 80, borderRadius: 14, marginBottom: 12 },
  contenidoGenero: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
});
