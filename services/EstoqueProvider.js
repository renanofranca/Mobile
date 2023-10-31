// Fontes: 
// https://legacy.reactjs.org/docs/context.html
// https://react.dev/reference/react/useContext


//https://dev.to/ms_yogii/usecontext-for-better-state-management-51hi
import { createContext, useState } from 'react';


//https://refine.dev/blog/usecontext-and-react-context/

//coloque neste objeto tudo aquilo que deseja compartilhar entre componentes
const dadosCompartilhados = {
    categorias: []  
};


//create a context, with createContext api
export const estoqueContext = createContext(dadosCompartilhados);


function EstoqueProvider(props) {
    return (

        <estoqueContext.Provider value={dadosCompartilhados}> 
            {props.children}
            {
                //https://stackoverflow.com/questions/49706823/what-is-this-props-children-and-when-you-should-use-it
            }
        </estoqueContext.Provider>
    );
};

export default EstoqueProvider;