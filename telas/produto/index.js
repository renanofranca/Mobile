import React, { useEffect, useState, useContext } from "react";
import {
    Alert, ScrollView, Text, TextInput, TouchableOpacity, View,
    ActivityIndicator, Image, Switch
} from 'react-native';
import styles from "./styles";
import api from "../../services/api";
import Operacao from  '../../utils/Operacao';
import Telas from '../../utils/Telas'
import  { trataErroAPI } from '../../utils/helper'
import CardProduto from "../../componentes/CardProduto";
import iconAdd from '../../assets/plus_64.png';
import { Picker } from '@react-native-picker/picker';
import { estoqueContext } from '../../services/EstoqueProvider';





export default function Produto({ telaAtual }) {
    const [id, setId] = useState();
    const [descricao, setDescricao] = useState();
    const [qtdeEstoque, setqtdeEstoque] = useState(0);
    const [qtdeMinima, setqtdeMinima] = useState(0);
    const [Ativo, setAtivo] = useState(true);
    const [CategoriaId, setCategoriaId] = useState();
    const dadosCompartilhados = useContext(estoqueContext);


    const [wait, setWait] = useState(false);
    const [tipoTela, setTipoTela] = useState(Operacao.LISTAGEM); 
    const [lista, setLista] = useState([]);

    async function salvar() {
        let obj = {
            id,
            descricao,
            qtdeEstoque,
            qtdeMinima,
            CategoriaId,
            Ativo
        };
        setWait(true);

        if (tipoTela == Operacao.INCLUSAO) {
            await api.post('/produto', obj)
                .then(() => aposSalvar())
                .catch(error => {
                    setWait(false);
                    trataErroAPI(error)
                });
        }
        else {

            await api.put('/produto/' + id, obj)
                .then(() => aposSalvar())
                .catch(error => {
                    setWait(false);
                    trataErroAPI(error)
                });
        }
    }

    async function aposSalvar() {
        setWait(false);
        await carregaProdutos();
        setTipoTela(Operacao.LISTAGEM);
    }


    async function carregaProdutos() {
        try {
            setWait(true);
            let resposta = (await api.get('/produto/filter/getAll'));
            setLista(resposta.data);

        } catch (e) {
            Alert.alert(e.toString());
        }
        finally {
            setWait(false);
        }
    }


    async function carregaCategorias() {
        try {
            let resposta = (await api.get('/categoria/filter/getAll'));
            return resposta.data;

        } catch (e) {
            Alert.alert(e.toString());
        }
    }


    useEffect(
        () => {
            console.log('executando useffect da listagem de produtos');
            carregaProdutos();

        }, []);

    useEffect(
        () => {
            if (telaAtual == Telas.PRODUTO) {
                console.log('executando useffect. Tela produto. Motivo. Tela atual trocada: ' + telaAtual);
                carregaProdutos();
            }

        }, [telaAtual]);


    function editaRegistro(produto) {
        setTipoTela(Operacao.ALTERACAO);
        setId(produto.id);
        setDescricao(produto.descricao);
        setqtdeEstoque(produto.qtdeEstoque);
        setqtdeMinima(produto.qtdeMinima);
        setCategoriaId(produto.CategoriaId);
        setAtivo(produto.Ativo);
    }


    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção?',
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaRemocao(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    }

    async function efetivaRemocao(id) {
        try {
            api.delete('/produto/' + id).
                then(() => { carregaProdutos() });

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function novoRegistro() {
        try {
            let resposta = await api.get('/produto/filter/getNextId');
            setId(resposta.data);

            if (!dadosCompartilhados.categorias ||
                 dadosCompartilhados.categorias.length == 0) {
                let categs = await carregaCategorias();
                dadosCompartilhados.categorias = categs;
                console.log("carregando categorias na tela do produto");
            }
            else {
                console.log('Não foi necessario carregar as categorias.');
                //console.log(categorias);
            }

            setDescricao('');
            setqtdeEstoque(0);
            setAtivo(true);
            setqtdeMinima(0);
            setCategoriaId('');
            setTipoTela(Operacao.INCLUSAO)

        } catch (e) {
            Alert.alert(e.toString());
        }

    }



    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>Produto</Text>


            {
                tipoTela != Operacao.LISTAGEM
                    ?
                    <ScrollView contentContainerStyle={styles.containerCadastro} >

                        <View style={styles.areaCampos1Linha}>
                            <View style={styles.areaCodigo}>
                                <Text style={styles.label}>Código</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={id.toString()}
                                    onChangeText={(text) => { setId(text) }}
                                    style={styles.caixaTexto}
                                />
                            </View>
                            <View style={styles.areaAtivo} >
                                <Switch onValueChange={() => setAtivo(!Ativo)} value={Ativo} style={styles.switchAtivo} />
                                <Text style={styles.label}>Ativo</Text>
                            </View>
                        </View>

                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            value={descricao}
                            onChangeText={(text) => { setDescricao(text) }}
                            style={styles.caixaTexto}
                        />

                        <View style={styles.areaCampos1Linha}>
                            <View style={styles.areqQtde}>
                                <Text style={styles.label}>Qtde Estoque</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={qtdeEstoque.toString()}
                                    onChangeText={(text) => { setqtdeEstoque(text) }}
                                    style={styles.caixaTexto}
                                />
                            </View>

                            <View style={styles.areqQtdeMinima}>
                                <Text style={styles.label}>Qtde mínima</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={qtdeMinima.toString()}
                                    onChangeText={(text) => { setqtdeMinima(text) }}
                                    style={styles.caixaTexto}
                                />
                            </View>
                        </View>



                        <Text style={styles.label}>Categoria</Text>
                        <Picker
                            selectedValue={CategoriaId}
                            onValueChange={(itemValue, itemIndex) => setCategoriaId(itemValue)}
                            dropdownIconColor={'#038a27'}
                            prompt='Selecione a categoria...'
                            style={styles.caixaTexto}
                        >
                            {
                                dadosCompartilhados.categorias.map((categoria, index) => (
                                    <Picker.Item key={index.toString()} label={categoria.descricao}
                                        value={categoria.id} style={styles.categoriaPicker} />
                                ))
                            }

                        </Picker>

                        {
                            wait
                                ?
                                <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                                :
                                <View style={styles.areaBotaoSalvar}>
                                    <TouchableOpacity style={styles.botaoVoltar} onPress={() => setTipoTela(Operacao.LISTAGEM)}>
                                        <Text style={styles.textoBotaoSalvar}>Voltar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvar()}>
                                        <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                        }

                    </ScrollView>
                    :
                    <>
                        {
                            wait
                                ?
                                <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                                :
                                <>
                                    <TouchableOpacity onPress={() => novoRegistro()}>
                                        <Image source={iconAdd} />
                                    </TouchableOpacity>

                                    <ScrollView>
                                        {
                                            lista.map((produto, index) => (
                                                <CardProduto key={index.toString()} produto={produto}
                                                    editar={editaRegistro} remover={removerElemento} />
                                            ))
                                        }
                                    </ScrollView>
                                </>
                        }
                    </>
            }
        </View >

    );
}