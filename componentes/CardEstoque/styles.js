import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    areaCard: {
        flexDirection: 'row',
        height: 110,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#67e689',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    areaDados: {
        width: '100%',
        paddingLeft: 5,
        flexDirection: 'column'
    },
    dadosProdutoECategoria: {
        width: '100%',
        flexDirection: 'row'
    },
    areaQuantidades: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    areaQtde:{        
        flexDirection: 'row'
    },
    areaAtivo: {
        width: '100%',
        flexDirection: 'row'
    },

    legenda: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'column',
    },

    descricao: {
        fontSize: 18,
        flexDirection: 'column',
    },


    areaNome: {
        width: '100%',
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: 'bold',
    },


});


export default styles;