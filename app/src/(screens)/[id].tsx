import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native';
import { styles } from './[id].styles';

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
