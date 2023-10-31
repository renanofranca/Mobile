import { useEffect, useState,  useRef } from "react";
import {
    Alert, ScrollView, Text,  TouchableOpacity, View,
    ActivityIndicator, Image, Switch, 
} from 'react-native';
import styles from "./styles";
import api from "../../services/api";
import Telas from '../../utils/Telas'
import CardEstoque from "../../componentes/CardEstoque";
import { Picker } from '@react-native-picker/picker';

import iconDown from '../../assets/down.png';
import iconUp from '../../assets/up.png';


export default function Estoque({ telaAtual  }) {

    const [wait, setWait] = useState(false);
    const [lista, setLista] = useState([]);
    const [ordem, setOrdem] = useState("c"); // c = codigo, d = descricao, q = qtde
    const [situacao, setSituacao] = useState("t"); // t=todos, a=ativo, i=inativo
    const [filtroExpandido, setFiltroExpandido] = useState(false);
    const [filtroQtde, setFiltroQtde] = useState(false);
    const [timerLigado, setTimerLigado] = useState(false);
    const [estoqueComProblema, setEstoqueComProblema] = useState(false);

    const data = useRef(null);
    data.telaAtual = telaAtual; 

    async function carregaProdutos() {
        try {
            setWait(true);
            let resposta = (await api.get(`/produto/filter/getAllFiltered/${ordem}/${situacao}/${filtroQtde}`));
            setLista(resposta.data);

        } catch (e) {
            Alert.alert(e.toString());
        }
        finally {
            setWait(false);
        }
    }


    

    function timerControleProdutos() {

        setTimeout(() => {
            console.log('setTimeout: Tela atual : ' + data.telaAtual);
            if (data.telaAtual === Telas.ESTOQUE) {
                console.log('Tela atual:' + data.telaAtual);
                console.log("Verificando produtos com quantidade abaixo do mínimo...");
                consultaProdutosComQtdeInferiorAoMinimo()
                    .then((response) => {
                        //console.log(response);
                        setEstoqueComProblema(response);
                        timerControleProdutos();
                    })
                    .catch(erro => console.log(erro));
            }
            else
                timerControleProdutos();

        }, 5000);
    }

    async function consultaProdutosComQtdeInferiorAoMinimo() {
        try {
            let resposta = (await api.get('/produto/filter/getEstoqueBaixo'));
            //console.log(resposta.data);
            return resposta.data == true;

        } catch (e) {
            Alert.alert(e.toString());
            return false;
        }
    }



    function exibeEstoqueBaixo(){
        setSituacao('a');
        setFiltroQtde(true);
    }

    useEffect(
        () => {
            if (telaAtual == Telas.ESTOQUE) {
                console.log('executando useffect. Tela Estoque. Tela atual: ' +telaAtual);
                carregaProdutos();

                if (!timerLigado) {

                    setTimerLigado(true);
                    timerControleProdutos();
                }
            }
        }, [ordem, situacao, filtroQtde, telaAtual, estoqueComProblema]);


    return (

        <View style={styles.container}>

            {estoqueComProblema
                ?
                <TouchableOpacity  style={styles.tituloBotao}
                onPress={()=>exibeEstoqueBaixo()}>
                    <Text style={styles.titulo}>Estoque  ⚠️  </Text>
                </TouchableOpacity>
                :
                <Text style={styles.titulo}>Estoque</Text>
            }

            {
                wait
                    ?
                    <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                    :
                    <>
                        <View style={[styles.areaFiltro,
                        filtroExpandido && styles.filtroExpandido,
                        !filtroExpandido && styles.filtroOculto]} >

                            <View style={styles.areaCamposFiltro}>
                                {
                                    filtroExpandido
                                        ?
                                        <>
                                            <View style={styles.areaCaixasCombo}>
                                                <View>
                                                    <Text style={styles.label}>Ordenação</Text>
                                                    <Picker
                                                        selectedValue={ordem}
                                                        onValueChange={(itemValue, itemIndex) => setOrdem(itemValue)}
                                                        dropdownIconColor={'#038a27'}
                                                        prompt='Selecione a ordem de exibição...'
                                                        style={styles.comboOrdenacao}

                                                    >
                                                        <Picker.Item label='Código' value='c' style={styles.itemPicker} />
                                                        <Picker.Item label='Descrição' value='d' style={styles.itemPicker} />
                                                        <Picker.Item label='Quantidade' value='q' style={styles.itemPicker} />
                                                    </Picker>
                                                </View>

                                                <View>
                                                    <Text style={styles.label}>Situação</Text>
                                                    <Picker
                                                        selectedValue={situacao}
                                                        onValueChange={(itemValue, itemIndex) => setSituacao(itemValue)}
                                                        dropdownIconColor={'#038a27'}
                                                        prompt='Selecione a situação...'
                                                        style={styles.comboOrdenacao}

                                                    >
                                                        <Picker.Item label='Todos' value='t' style={styles.itemPicker} />
                                                        <Picker.Item label='Ativos' value='a' style={styles.itemPicker} />
                                                        <Picker.Item label='Inativos' value='i' style={styles.itemPicker} />
                                                    </Picker>
                                                </View>
                                            </View>
                                            <View style={styles.areaFiltroQtde}>
                                                <Switch onValueChange={() => setFiltroQtde(!filtroQtde)} value={filtroQtde} style={styles.switchAtivaFiltroQtde} />
                                                <Text style={styles.label}>Exibir apenas itens com estoque abaixo do mínimo</Text>
                                            </View>
                                        </>
                                        :
                                        <Text style={styles.label}>  Filtros</Text>
                                }
                            </View>
                            <View style={styles.areaIconeFiltro}>
                                {
                                    filtroExpandido
                                        ?
                                        <TouchableOpacity onPress={() => setFiltroExpandido(false)}>
                                            <Image source={iconUp} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => setFiltroExpandido(true)}>
                                            <Image source={iconDown} />
                                        </TouchableOpacity>

                                }
                            </View>
                        </View>


                        <ScrollView>
                            {
                                lista.map((produto, index) => (
                                    <CardEstoque key={index.toString()} produto={produto} />
                                ))
                            }
                        </ScrollView>
                    </>
            }
        </View>
    );
}