import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        padding: 32,
    }

    ,
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(78,205,196,0.06)',
        top: '20%',
        alignSelf: 'center',
    }

    ,
    content: {
        alignItems: 'center',
        gap: 18,
        width: '100%',
        maxWidth: 600,
    }

    ,
    eyebrow: {
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: '#4ecdc4',
        opacity: 0.8,
        fontFamily: 'Courier New',
    }

    ,
    title: {
        color: '#e8e0d5',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '300',
    }

    ,
    sub: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#7a7068',
        lineHeight: 26,
        textAlign: 'center',
    }

    ,
    btn: {
        marginTop: 12,
        backgroundColor: '#4ecdc4',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 100,
    }

    ,
    btnPressed: {
        opacity: 0.8,
    }

    ,
    btnText: {
        color: '#0a0a0a',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        fontFamily: 'Courier New',
    }

    ,
    footer: {
        position: 'absolute',
        bottom: 24,
        fontSize: 11,
        letterSpacing: 2,
        color: '#7a7068',
        opacity: 0.5,
        textTransform: 'uppercase',
        fontFamily: 'Courier New',
    }

    ,
})