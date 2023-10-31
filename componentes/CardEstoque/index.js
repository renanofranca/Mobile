import { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { estoqueContext } from '../../services/EstoqueProvider';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function CardEstoque({ produto }) {

    //const [categorias, setCategorias] = useContext(estoqueContext);
    const {telaAtual, setTelaAtual, categorias, setCategorias} = useContext(estoqueContext);

    function encontraCategoria(id) {
        let categoria = categorias.find(categ => categ.id == id);
        if (categoria) {
            return categoria.descricao
        }
        else
            return "";
    }


    return (
        <View style={styles.areaCard} >

            <View style={styles.areaDados}>
                <View style={styles.dadosProdutoECategoria}>
                    <Text style={styles.legenda}>Produto : </Text>
                    <Text style={styles.descricao}>{produto.id} - {produto.descricao}  </Text>
                </View>
                <View style={styles.dadosProdutoECategoria}>
                    <Text style={styles.legenda}>Categoria: </Text>
                    <Text style={styles.descricao}>{encontraCategoria(produto.CategoriaId)} </Text>
                </View>

                <View style={styles.areaQuantidades}>
                    <View style={styles.areaQtde}>
                        <Text style={styles.legenda}>Qtde no estoque: </Text>
                        <Text style={styles.descricao}>{produto.qtdeEstoque} </Text>
                    </View>
                    <View style={styles.areaQtde}>
                        <Text style={styles.legenda}>Qtde mínima: </Text>
                        <Text style={styles.descricao}>{produto.qtdeMinima} </Text>
                    </View>
                </View>
                <View style={styles.areaAtivo}>
                    <Text style={styles.legenda}>Ativo: </Text>
                    <Text style={styles.descricao}>{
                        produto.Ativo ? 'Sim' : 'Não'
                    } </Text>
                </View>
            </View>
        </View >
    );
};