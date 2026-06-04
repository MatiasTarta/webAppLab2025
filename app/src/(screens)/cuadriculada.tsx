import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#151515',
        borderBottomWidth: 1,
        borderColor: '#222',
    },
    backButton: {
        color: '#4ecdc4',
        fontSize: 14.5,
        fontWeight: '500',
        fontFamily: 'monospace',
    },
    titulo: {
        fontSize: 24,
        fontWeight: '400',
        color: '#fff',
    },
    crearButton: {
        backgroundColor: '#51cf66',
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crearButtonText: {
        color: '#0a0a0a',
        fontSize: 18,
        fontWeight: '700',
    },
    listContainer: {
        padding: 10,
    },
    gridRow: {
        justifyContent: 'space-between',
    },
    card: {
        flex: 0.485,
        marginBottom: 12,
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 12,
        overflow: 'hidden',
    },
    imageWrap: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cardInfo: {
        padding: 10,
        gap: 6,
    },
    cardNombre: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 18,
    },
    cardTags: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 7,
        paddingVertical: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
    },
    tagTipo: {
        fontSize: 11,
        color: '#888',
        fontStyle: 'italic',
    },
    estadoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    estadoTexto: {
        color: '#888',
        fontStyle: 'italic',
        fontSize: 15,
        textAlign: 'center',
    },
    spinnerTexto: {
        color: '#4ecdc4',
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'monospace',
    },
    errorTexto: {
        color: '#ef5350',
    },
});