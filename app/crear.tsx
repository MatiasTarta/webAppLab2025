import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const CATEGORIAS = ['teclado', 'percusion', 'cuerda', 'viento', 'electronico'];
const ESCALAS = ['ninguna', 'DOr', 'DOm', 'RE', 'REm', 'MI', 'FA', 'SOL', 'LAm'];


const API_URL = 'http://localhost:3000';

export default function CrearInstrumento() {
    const [form, setForm] = useState({
        nombre: '',
        tipoSonido: '',
        categoria: '',
        escala: 'ninguna',
        imagen: '',
        link: '',
        carpetaSonidos: '',
    });

    const [enviando, setEnviando] = useState(false);
    const [msg, setMsg] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = async () => {
        if (!form.nombre.trim() || !form.tipoSonido.trim() || !form.categoria) {
            setMsg({ tipo: 'error', texto: 'Nombre, tipo de sonido y categoría son obligatorios.' });
            return;
        }

        setEnviando(true);
        setMsg(null);

        try {
            const res = await fetch(`${API_URL}/api/instrumentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    imagen: form.imagen.replace('../assets/img/', '').trim() || 'placeholder.png',
                    carpetaSonidos: form.carpetaSonidos.trim()
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detalles?.join(', ') ?? data.error);

            setMsg({ tipo: 'ok', texto: `✓ "${data.nombre}" creado con ID ${data.id}` });

            // Limpiamos el formulario
            setForm({
                nombre: '',
                tipoSonido: '',
                categoria: '',
                escala: 'ninguna',
                imagen: '',
                link: '',
                carpetaSonidos: '',
            });
            Alert.alert('¡Éxito!', `Instrumento creado con ID ${data.id}`, [
                { text: 'OK', onPress: () => router.replace('/cuadriculada') }
            ]);

        } catch (e: any) {
            setMsg({ tipo: 'error', texto: e.message ?? 'Error al crear instrumento.' });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <View style={styles.crear}>
            {/* HEADER NATIVO */}
            <View style={styles.crearHeader}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.crearBack}>← Volver</Text>
                </Pressable>
                <Text style={styles.crearTitulo}>Nuevo Instrumento</Text>
                <View style={{ width: 60 }} />
            </View>

            {/* CUERPO FORMULARIO */}
            <ScrollView contentContainerStyle={styles.crearBody}>

                <Field label="Nombre *">
                    <TextInput
                        style={styles.input}
                        value={form.nombre}
                        onChangeText={(v) => set('nombre', v)}
                        placeholder="ej. Guitarra Española"
                        placeholderTextColor="#555"
                    />
                </Field>
                <Field label="Categoría *">
                    <View style={styles.selectorGrid}>
                        {CATEGORIAS.map((c) => (
                            <Pressable
                                key={c}
                                style={[styles.selectorItem, form.categoria === c && styles.selectorItemActive]}
                                onPress={() => set('categoria', c)}
                            >
                                <Text style={[styles.selectorText, form.categoria === c && styles.selectorTextActive]}>
                                    {c.toUpperCase()}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </Field>

                <Field label="Tipo de Sonido *">
                    <TextInput
                        style={styles.input}
                        value={form.tipoSonido}
                        onChangeText={(v) => set('tipoSonido', v)}
                        placeholder="ej. acustico, rock, jazz"
                        placeholderTextColor="#555"
                    />
                </Field>
                <Field label="Escala">
                    <View style={styles.selectorGrid}>
                        {ESCALAS.map((s) => (
                            <Pressable
                                key={s}
                                style={[styles.selectorItem, form.escala === s && styles.selectorItemActive]}
                                onPress={() => set('escala', s)}
                            >
                                <Text style={[styles.selectorText, form.escala === s && styles.selectorTextActive]}>
                                    {s}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </Field>

                <Field label="Nombre Imagen" hint="Nombre del archivo (Debe estar en backend/public/img/)">
                    <TextInput
                        style={styles.input}
                        value={form.imagen}
                        onChangeText={(v) => set('imagen', v)}
                        placeholder="ej. guitarra.png"
                        placeholderTextColor="#555"
                        autoCapitalize="none"
                    />
                </Field>

                <Field label="Carpeta de sonidos" hint="Ruta del identificador de audios">
                    <TextInput
                        style={styles.input}
                        value={form.carpetaSonidos}
                        onChangeText={(v) => set('carpetaSonidos', v)}
                        placeholder="ej. guitarra_espanola/"
                        placeholderTextColor="#555"
                        autoCapitalize="none"
                    />
                </Field>

                {msg && (
                    <View style={[styles.crearMsg, msg.tipo === 'ok' ? styles.msgOk : styles.msgError]}>
                        <Text style={[styles.msgText, msg.tipo === 'ok' ? styles.textOk : styles.textError]}>
                            {msg.texto}
                        </Text>
                    </View>
                )}

                <View style={styles.crearBtns}>
                    <Pressable style={styles.btnCancelar} onPress={() => router.back()}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.btnCrear, enviando && { opacity: 0.5 }]}
                        onPress={handleSubmit}
                        disabled={enviando}
                    >
                        {enviando ? (
                            <ActivityIndicator size="small" color="#0a0a0a" />
                        ) : (
                            <Text style={styles.btnCrearText}>✓ Crear</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <View style={styles.crearField}>
            <Text style={styles.fieldLabel}>{label}</Text>
            {children}
            {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    crear: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    crearHeader: {
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
    crearBack: {
        color: '#4ecdc4',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'monospace',
    },
    crearTitulo: {
        fontSize: 20,
        fontWeight: '400',
        color: '#e8e0d5',
    },
    crearBody: {
        padding: 20,
        gap: 18,
        paddingBottom: 40,
    },
    crearField: {
        flexDirection: 'column',
        gap: 6,
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#7a7068',
        fontFamily: 'monospace',
    },
    fieldHint: {
        fontSize: 11,
        color: '#7a7068',
        fontStyle: 'italic',
    },
    input: {
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        color: '#e8e0d5',
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
    },
    selectorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 2,
    },
    selectorItem: {
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    selectorItemActive: {
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78,205,196,0.1)',
    },
    selectorText: {
        color: '#7a7068',
        fontSize: 11,
        fontWeight: '600',
        fontFamily: 'monospace',
    },
    selectorTextActive: {
        color: '#4ecdc4',
    },
    crearMsg: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 4,
    },
    msgOk: {
        backgroundColor: 'rgba(81,207,102,0.08)',
        borderColor: 'rgba(81,207,102,0.2)',
    },
    msgError: {
        backgroundColor: 'rgba(239,83,80,0.08)',
        borderColor: 'rgba(239,83,80,0.2)',
    },
    msgText: {
        fontSize: 14,
        textAlign: 'center',
    },
    textOk: {
        color: '#51cf66',
    },
    textError: {
        color: '#ef5350',
    },
    crearBtns: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    btnCancelar: {
        flex: 1,
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#222',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnCancelarText: {
        color: '#7a7068',
        fontSize: 15,
        fontWeight: '500',
    },
    btnCrear: {
        flex: 2,
        backgroundColor: '#51cf66',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCrearText: {
        color: '#0a0a0a',
        fontSize: 15,
        fontWeight: '700',
    },
});