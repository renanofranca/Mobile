import React, { useEffect, useState, useContext } from "react";
import {
    Alert, ScrollView, Text, TextInput, TouchableOpacity, View,
    ActivityIndicator, Image,
} from 'react-native';
import styles from "./styles";
import api from "../../services/api";
import { trataErroAPI } from '../../utils/helper'
import CardCategoria from "../../componentes/CardCategoria";
import iconAdd from '../../assets/plus_64.png';
import { estoqueContext } from '../../services/EstoqueProvider';
import Operacao from  '../../utils/Operacao';


export default function Categoria() {
    const [id, setId] = useState();
    const [descricao, setDescricao] = useState();
    const [wait, setWait] = useState(false);
    const [tipoTela, setTipoTela] = useState(Operacao.LISTAGEM); 

    //usado para compartilhar estado entre componentes.
    const dadosCompartilhados = useContext(estoqueContext);

    async function salvar() {
        let obj = {
            id,
            descricao
        };
        setWait(true);

        if (tipoTela == Operacao.INCLUSAO) {
            await api.post('/categoria', obj)
                .then(() => aposSalvar())
                .catch(error => {
                    setWait(false);
                    trataErroAPI(error)
                });
        }
        else {

            await api.put('/categoria/' + id, obj)
                .then(() => aposSalvar())
                .catch(error => {
                    setWait(false);
                    trataErroAPI(error)
                });
        }
    }

    async function aposSalvar() {
        setWait(false);
        await carregaCategorias();
        setTipoTela(Operacao.LISTAGEM);
    }


    async function carregaCategorias() {
        try {
            setWait(true);
            
            let resposta = (await api.get('/categoria/filter/getAll'));
            dadosCompartilhados.categorias = resposta.data;
            console.log('carregando as categorias na tela de categorias');                      

        } catch (e) {
            Alert.alert(e.toString());
        }
        finally {
            setWait(false);
        }
    }


    useEffect(
        () => {
            console.log('executando useffect da listagem');
            carregaCategorias();
        }, []);


    function editaRegistro(categoria) {
        //console.log(categoria);
        setTipoTela(Operacao.ALTERACAO);
        setId(categoria.id);
        setDescricao(categoria.descricao);
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
            api.delete('/Categoria/' + id).
                then(() => { carregaCategorias() });

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function novoRegistro() {
        try {
            let resposta = await api.get('/Categoria/filter/getNextId');
            setId(resposta.data);
            setDescricao('');
            setTipoTela(Operacao.INCLUSAO)

        } catch (e) {
            Alert.alert(e.toString());
        }

    }



    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>Categoria</Text>


            {
                tipoTela != Operacao.LISTAGEM
                    ?
                    <>
                        <Text style={styles.label}>Código</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={id.toString()}
                            onChangeText={(text) => { setId(text) }}
                            style={styles.caixaTexto}
                        />

                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            value={descricao}
                            onChangeText={(text) => { setDescricao(text) }}
                            style={styles.caixaTexto}
                        />
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

                    </>
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
                                            dadosCompartilhados.categorias.map((categ, index) => (
                                                <CardCategoria key={index.toString()} categoria={categ}
                                                    editar={editaRegistro} remover={removerElemento} />
                                            ))
                                        }
                                    </ScrollView>
                                </>
                        }
                    </>
            }
        </View>


    );

}