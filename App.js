import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3DarkTheme, BottomNavigation } from 'react-native-paper';
import InicioScreen from './src/screens/InicioScreen';
import ReproductorScreen from './src/screens/ReproductorScreen';
import BuscarScreen from './src/screens/BuscarScreen';
import { canciones } from './src/data';

// Tema oscuro de Paper con el verde limon del diseno como color principal
const tema = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#C6F432', // botones de texto, Searchbar, etc
    onPrimary: '#000',
    secondaryContainer: '#C6F432', // la "pastilla" verde de la pestana activa
    onSecondaryContainer: '#000',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    elevation: { ...MD3DarkTheme.colors.elevation, level2: '#1A1A1A' }, // fondo de la barra inferior
  },
};

export default function App() {
  // Pestana activa: 0 = Inicio, 1 = Reproductor, 2 = Buscar
  const [indice, setIndice] = useState(0);
  // Cancion que se muestra en el Reproductor
  const [cancionActual, setCancionActual] = useState(canciones[0]);

  // Las pestanas de la barra inferior (BottomNavigation de Paper)
  // focusedIcon = icono cuando esta activa, unfocusedIcon = cuando no
  const [rutas] = useState([
    { key: 'inicio', title: 'Inicio', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'reproductor', title: 'Reproductor', focusedIcon: 'music-circle', unfocusedIcon: 'music-circle-outline' },
    { key: 'buscar', title: 'Buscar', focusedIcon: 'magnify' },
  ]);

  // Al tocar una cancion: la guardamos y saltamos a la pestana Reproductor
  const reproducir = (cancion) => {
    setCancionActual(cancion);
    setIndice(1);
  };

  // Decide que pantalla dibujar segun la pestana
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'inicio':
        return <InicioScreen reproducir={reproducir} />;
      case 'reproductor':
        // key hace que el reproductor empiece de cero al cambiar de cancion
        return <ReproductorScreen key={cancionActual.id} cancion={cancionActual} regresar={() => setIndice(0)} />;
      case 'buscar':
        return <BuscarScreen reproducir={reproducir} />;
      default:
        return null;
    }
  };

  return (
    // SafeAreaProvider: evita que el contenido quede debajo del notch o la barra del sistema
    // PaperProvider: le pasa el tema a todos los componentes de Paper
    <SafeAreaProvider>
      <PaperProvider theme={tema}>
        <StatusBar style="light" />
        <BottomNavigation
          navigationState={{ index: indice, routes: rutas }}
          onIndexChange={setIndice}
          renderScene={renderScene}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
