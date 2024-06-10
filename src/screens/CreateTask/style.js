import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#707070",
        padding: 30,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 20,
        marginBottom: 20,
        width: '100%'
    },
    button: {
        backgroundColor: '#070A52',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    // Estilos específicos para a aba de materiais
    materialTab: {
        flexDirection: 'row', // Adicionando flex direction row
        alignItems: 'center', // Alinhar itens verticalmente ao centro
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        width: 660,
    },
    materialText: {
        flex: 1, // Ocupa todo o espaço disponível
        fontSize: 18,
        color: '#000', // Cinza com 70% de transparência
    },
    removeButton: {
        backgroundColor: '#123449', // Cor vermelha
        padding: 10,
        borderRadius: 10,
        marginLeft: 10, // Adicionando margem à esquerda para separar o botão do texto
    },
    removeButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    materialPicker: {
        fontSize: 18,
        color: 'rgba(128, 128, 128, 0.7)', // Cinza com 70% de transparência
        width: '100%',
    },
    addButton: {
        backgroundColor: '#FFA500', // Cor laranja
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    addButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 20,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#084d6e',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '100%',
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#123449',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '100%',
    },
    addButtonText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    materialOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    materialOptionText: {
        fontSize: 18,
    },
    closeButton: {
        backgroundColor: '#070A52',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default styles;
