import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  Dimensions, TouchableOpacity, Image
} from 'react-native';
import EstoqueProvider, { estoqueContext } from './services/EstoqueProvider';
import Dimensoes from './utils/Dimensoes';
import iconProduct from './assets/product.png';
import iconCategory from './assets/category.png';
import iconInventory from './assets/estoque.png';
import styles from './styles';
import Produto from './telas/produto';
import Categoria from './telas/categoria';
import Estoque from './telas/estoque';
import Telas from './utils/Telas';


export default function Home() {

  const objScrool = useRef(null);  
  const [telaAtual, setTelaAtual] = useState(0);


  //indice inicia no zero
  function trocaTela(index) {
    setTelaAtual(index);    
    objScrool.current?.scrollTo({ x: Dimensoes.width * index, animated: true });
  }


  function telaEstoque() {
    trocaTela(Telas.ESTOQUE);
  }

  function telaProduto() {

    trocaTela(Telas.PRODUTO);
  }

  function telaCategoria() {
    trocaTela(Telas.CATEGORIA);
  }
 


  return (
    <View style={styles.container}>
      <View style={styles.areaBotoes}>
        <TouchableOpacity onPress={() => telaEstoque()}>
          <Image source={iconInventory} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => telaProduto()}>
          <Image source={iconProduct} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => telaCategoria()}>
          <Image source={iconCategory} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator ref={objScrool}
          scrollEnabled={false}
      > 
        <EstoqueProvider>
          <View style={[styles.viewPage]}>
            <Estoque telaAtual={telaAtual} />
          </View>

          <View style={[styles.viewPage]}>
            <Produto telaAtual={telaAtual} />
          </View>

          <View style={[styles.viewPage]}>
            <Categoria />
          </View>
        </EstoqueProvider>
      </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}

