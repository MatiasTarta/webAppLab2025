import { useRouter } from 'expo-router';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { styles } from './index.styles';

export default function Home() {
  const router = useRouter()

  const { width } = useWindowDimensions()

  const dynamicTitleSize = width * 0.12
  const dynamicLineHeight = dynamicTitleSize * 1.1

  return (

    <View style={styles.container}>
      <View style={styles.glow} />

      <View style={styles.content}>
        <Text style={styles.eyebrow}>✦ colección de instrumentos ✦</Text>

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

