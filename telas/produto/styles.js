import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 5,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FFF",
        backgroundColor: '#000',
        width: '100%',
        textAlign: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginTop: 10,
    },

    caixaTexto: {
        width: '90%',
        backgroundColor: '#FFE',
        fontSize: 30,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        paddingHorizontal: 5,

    },

    areaBotaoSalvar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        marginTop: 10,
        height: 70,
        width: '100%',
    },

    botaoSalvar: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#095de3',
    },
    botaoVoltar: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#ced9e0',
    },

    textoBotaoSalvar: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#FFF",
    },
    waiting: {
        marginTop: 20,
    },
    areaAtivo: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '30%',        
    },
    switchAtivo: {
        transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
        marginRight: 30,
    },
    containerCadastro: {
        alignItems: 'center',
    },
    categoriaPicker: {
        fontSize: 20,
    },

    areaCampos1Linha: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-end',        
    },
    
    areaCodigo: {
        width: '40%',
        paddingLeft: 0,
        marginRight: 40,
    },
    areqQtde: {
        width: '50%',        
    },
    areqQtdeMinima: {
        width: '50%',        
        marginLeft: 16,
    }
});


export default styles;