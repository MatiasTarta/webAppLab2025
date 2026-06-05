
import { StyleSheet } from 'react-native';
export
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