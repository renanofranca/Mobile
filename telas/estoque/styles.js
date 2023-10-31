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
    },
    tituloBotao: {        
        backgroundColor: '#000',
        width: '100%',        
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginVertical: 5,
    },

    comboOrdenacao: {
        width: 145,
        backgroundColor: '#FFE',
        fontSize: 10,
    },

    waiting: {
        marginTop: 20,
    },

    areaFiltroQtde: {
        flexDirection: 'row',
        marginVertical: 5,
        width: '90%',
        marginLeft: 10,        
    },

    switchAtivaFiltroQtde: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        marginRight: 20,
    },
    containerCadastro: {
        alignItems: 'center',
    },
    itemPicker: {
        fontSize: 15,
    },
    areaFiltro: {
        marginTop: 10,
        width: '98%',
        justifyContent: 'space-around',
        backgroundColor: '#e1e4e8',        
        borderRadius: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    filtroExpandido:{
        height: 140
    },
    filtroOculto:{
        height: 42
    },
    areaIconeFiltro:{
        justifyContent: 'flex-start',        
        width: '13%',     
    },

    areaCamposFiltro: {
        width: '87%',
        justifyContent: 'space-around',
        flexDirection: 'column',        
    },
    areaCaixasCombo: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',        
    },
});


export default styles;