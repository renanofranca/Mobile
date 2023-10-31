import { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { estoqueContext } from '../../services/EstoqueProvider';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function CardProduto({ produto, remover, editar }) {

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
            </View>

            <View style={styles.areaBotoesAcao}>
                <TouchableOpacity onPress={() => remover(produto.id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(produto)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View >
    );
};