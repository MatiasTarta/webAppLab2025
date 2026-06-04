import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Instrumento {
    id: number;
    nombre: string;
    tipoSonido: string;
    escala: string;
    categoria: string;
    imagen: string;
    link: string;
    carpetaSonidos: string;
}

const API_URL = 'http://localhost:3000';

const CATEGORIA_COLOR: Record<string, string> = {
    teclado: '#4ecdc4',
    percusion: '#f9a825',
    cuerda: '#ef5350',
    viento: '#ab47bc',
    electronico: '#42a5f5',
};

const descripcionAuto = (inst: Instrumento) =>
    `${inst.nombre} es un instrumento de tipo ${inst.tipoSonido} perteneciente a la categoría ${inst.categoria}. ` +
    `${inst.escala !== 'ninguna' ? `Su escala base es ${inst.escala}.` : 'No tiene una escala fija asignada.'} ` +
    `Forma parte de la colección del Ático de Vilma.`;

export default function DetalleInstrumento() {
    const { id } = useLocalSearchParams();
    const [inst, setInst] = useState<Instrumento | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            if (!id) return;
            setCargando(true);
            setError('');
            try {
                const res = await fetch(`${API_URL}/api/instrumentos/${id}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setInst(data);
            } catch {
                setError('No se pudo cargar el instrumento.');
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [id]);

    return (
        <View style={styles.vista}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Volver</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Instrumento</Text>
                <View style={styles.headerDummy} />
            </View>

            {cargando && (
                <View style={styles.estadoContainer}>
                    <ActivityIndicator size="large" color="#4ecdc4" />
                    <Text style={styles.estadoTexto}>Cargando...</Text>
                </View>
            )}

            {error ? (
                <View style={styles.estadoContainer}>
                    <Text style={[styles.estadoTexto, styles.errorTexto]}>{error}</Text>
                </View>
            ) : null}

            {inst && !cargando && (
                <ScrollView contentContainerStyle={styles.body}>
                    <View style={styles.imgWrap}>
                        <Image
                            source={{
                                uri: inst.imagen && !imgError
                                    ? `${API_URL}/img/${inst.imagen}`
                                    : 'https://placehold.co/400x400/1a1a1a/4ecdc4?text=♪',
                            }}
                            style={styles.image}
                            resizeMode="cover"
                            onError={() => setImgError(true)}
                        />
                    </View>

                    <View style={styles.info}>
                        <View
                            style={[
                                styles.categoriaTag,
                                {
                                    borderColor: CATEGORIA_COLOR[inst.categoria] ?? '#888',
                                    backgroundColor: `${CATEGORIA_COLOR[inst.categoria] ?? '#888'}1A`,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoriaText,
                                    { color: CATEGORIA_COLOR[inst.categoria] ?? '#888' },
                                ]}
                            >
                                {inst.categoria}
                            </Text>
                        </View>

                        <Text style={styles.nombre}>{inst.nombre}</Text>
                        <Text style={styles.descripcion}>{descripcionAuto(inst)}</Text>

                        <View style={styles.detallesTabla}>
                            <View style={styles.detalleItem}>
                                <Text style={styles.detalleLabel}>Tipo de sonido</Text>
                                <Text style={styles.detalleValor}>{inst.tipoSonido}</Text>
                            </View>

                            <View style={styles.detalleItem}>
                                <Text style={styles.detalleLabel}>Escala</Text>
                                <Text style={styles.detalleValor}>{inst.escala}</Text>
                            </View>

                            {inst.carpetaSonidos ? (
                                <View style={[styles.detalleItem, { borderBottomWidth: 0 }]}>
                                    <Text style={styles.detalleLabel}>Sonidos</Text>
                                    <Text style={[styles.detalleValor, styles.codeText]}>
                                        {inst.carpetaSonidos}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    vista: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#151515',
        borderBottomWidth: 1,
        borderColor: '#222',
    },
    backButton: {
        color: '#4ecdc4',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'monospace',
    },
    headerTitle: {
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: '#7a7068',
        fontWeight: '600',
    },
    headerDummy: {
        width: 60,
    },
    estadoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    estadoTexto: {
        color: '#7a7068',
        fontStyle: 'italic',
        fontSize: 16,
        marginTop: 10,
    },
    errorTexto: {
        color: '#ef5350',
    },
    body: {
        flexDirection: 'column',
        paddingBottom: 40,
    },
    imgWrap: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#1a1a1a',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 16,
    },
    categoriaTag: {
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    categoriaText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    nombre: {
        fontSize: 36,
        fontWeight: '400',
        color: '#e8e0d5',
        lineHeight: 42,
    },
    descripcion: {
        fontSize: 15,
        lineHeight: 24,
        color: '#7a7068',
        fontStyle: 'italic',
        borderLeftWidth: 2,
        borderColor: '#4ecdc4',
        paddingLeft: 16,
    },
    detallesTabla: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 8,
        backgroundColor: '#151515',
        overflow: 'hidden',
    },
    detalleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#222',
    },
    detalleLabel: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        color: '#7a7068',
        fontFamily: 'monospace',
    },
    detalleValor: {
        fontSize: 14,
        color: '#e8e0d5',
        fontWeight: '600',
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#4ecdc4',
    },
});