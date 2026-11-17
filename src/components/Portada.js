import { View } from 'react-native';
import { Icon } from 'react-native-paper';

// Componente reutilizable: la "portada" de una cancion
// Es un cuadro de color con un icono en medio (en lugar de una imagen)
export default function Portada({ color, icono, tamano = 120, radio = 12 }) {
  return (
    <View
      style={{
        width: tamano,
        height: tamano,
        borderRadius: radio,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Icon es un componente de React Native Paper */}
      <Icon source={icono} size={tamano * 0.45} color="rgba(255,255,255,0.85)" />
    </View>
  );
}
