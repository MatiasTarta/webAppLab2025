import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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