import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    areaCard: {
        flexDirection: 'row',
        height: 80,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#b5c4b9',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    areaNome: {
        width: '90%',
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: 'bold',
    },    

    areaBotoesAcao: {
        width: '10%',
    },
});


export default styles;