import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    Text,
    View
} from 'react-native';
import { styles } from './cuadriculada.styles';

// Interfaces del modelo de datos
interface Instrumento {
    id: number;
    nombre: string;
    tipoSonido: string;
    escala: string;
    categoria: string;
    imagen: string;
    link: string;
}

interface ApiResponse {
    total: number;
    cantidad: number;
    from: number;
    datos: Instrumento[];
}

const API_URL = 'http://localhost:3000';

const CATEGORIA_COLOR: Record<string, string> = {
    teclado: '#4ecdc4',
    percusion: '#f9a825',
    cuerda: '#ef5350',
    viento: '#ab47bc',
    electronico: '#42a5f5',
};

export default function Cuadriculada() {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const cargarInstrumentos = useCallback(async () => {
        setCargando(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/instrumentos?cantidad=50&from=0`);
            if (!res.ok) throw new Error();
            const data: ApiResponse = await res.json();

            setInstrumentos(data.datos || []);
        } catch (err) {
            setError('No se pudo conectar al servidor.');
        } finally {
            setCargando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            cargarInstrumentos();
        }, [cargarInstrumentos])
    );
    const renderInstrumento = ({ item }: { item: Instrumento }) => (
        <Pressable
            style={styles.card}
            onPress={() => {
                router.push(`/${item.id}` as any);
            }}
        >
            <View style={styles.imageWrap}>
                <Image
                    source={{
                        uri: item.imagen
                            ? `${API_URL}/img/${item.imagen}`
                            : 'https://placehold.co/150x150/1a1a1a/4ecdc4?text=♪',
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardNombre} numberOfLines={2}>
                    {item.nombre}
                </Text>

                <View style={styles.cardTags}>
                    <View
                        style={[
                            styles.tag,
                            { borderColor: CATEGORIA_COLOR[item.categoria] ?? '#888' },
                        ]}
                    >
                        <Text
                            style={[
                                styles.tagText,
                                { color: CATEGORIA_COLOR[item.categoria] ?? '#888' },
                            ]}
                        >
                            {item.categoria}
                        </Text>
                    </View>

                    <Text style={styles.tagTipo}>{item.tipoSonido}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Inicio</Text>
                </Pressable>

                <Text style={styles.titulo}>Instrumentos</Text>

                <Pressable style={styles.crearButton} onPress={() => router.push('/crear')}>
                    <Text style={styles.crearButtonText}>＋</Text>
                </Pressable>
            </View>

            {/* CUERPO PRINCIPAL */}
            {error ? (
                <View style={styles.estadoContainer}>
                    <Text style={[styles.estadoTexto, styles.errorTexto]}>{error}</Text>
                </View>
            ) : cargando && instrumentos.length === 0 ? (
                <View style={styles.estadoContainer}>
                    <ActivityIndicator size="large" color="#4ecdc4" />
                    <Text style={styles.spinnerTexto}>Cargando...</Text>
                </View>
            ) : (
                <FlatList
                    data={instrumentos}
                    renderItem={renderInstrumento}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.gridRow}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.estadoContainer}>
                            <Text style={styles.estadoTexto}>No hay instrumentos.</Text>
                        </View>
                    }
                    ListFooterComponent={
                        cargando ? (
                            <ActivityIndicator size="small" color="#4ecdc4" style={{ marginVertical: 20 }} />
                        ) : null
                    }
                />
            )}
        </View>
    );
}

