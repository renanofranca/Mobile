import { StyleSheet } from 'react-native';
import Dimensoes from './utils/Dimensoes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPage: {    
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Dimensoes.width,
    //height: Dimensoes.height,
  },

  textbox: {
    width: '90%',
    backgroundColor: 'blue',
    fontSize: 30,
  },

  areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#CCF',
    marginTop: 50,
    height: 75,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    marginBottom: 5,
  },

});


export default styles;