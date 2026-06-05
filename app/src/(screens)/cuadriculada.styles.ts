
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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