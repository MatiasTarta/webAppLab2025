import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'

export default function Home() {
  const router = useRouter()

  // Este hook detecta el ancho y alto exacto en tiempo real (Web y Mobile)
  const { width } = useWindowDimensions()

  // Calculamos el tamaño de la fuente dinámicamente basado en el estado actual de la pantalla
  const dynamicTitleSize = width * 0.12 // Un factor un poco más equilibrado para web/móvil
  const dynamicLineHeight = dynamicTitleSize * 1.1

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <View style={styles.content}>
        <Text style={styles.eyebrow}>✦ colección de instrumentos ✦</Text>

        {/* Pasamos los estilos dinámicos directamente en un array */}
        <Text style={[
          styles.title,
          { fontSize: dynamicTitleSize, lineHeight: dynamicLineHeight }
        ]}>
          El Ático{'\n'}de Vilma
        </Text>

        <Text style={styles.sub}>
          Un lugar donde cada instrumento{'\n'}guarda su propia historia
        </Text>

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          onPress={() => router.push('/cuadriculada')}
        >
          <Text style={styles.btnText}>Ver Instrumentos  →</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Est. 2025 · Laboratorio de Interfaces</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    padding: 32,
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(78,205,196,0.06)',
    top: '20%',
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 18,
    width: '100%', // Asegura que el contenedor use el espacio responsivo
    maxWidth: 600,  // Evita que en pantallas gigantes de PC se deforme el layout
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#4ecdc4',
    opacity: 0.8,
    fontFamily: 'monospace',
  },
  title: {
    color: '#e8e0d5',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '300', // Un toque más estilizado para pantallas grandes
  },
  sub: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7a7068',
    lineHeight: 26,
    textAlign: 'center',
  },
  btn: {
    marginTop: 12,
    backgroundColor: '#4ecdc4',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: 'monospace',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    fontSize: 11,
    letterSpacing: 2,
    color: '#7a7068',
    opacity: 0.5,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
})