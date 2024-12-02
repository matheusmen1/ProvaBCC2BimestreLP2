import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { alterarUsuario, consultarUsuario, excluirUsuario, gravarUsuario} from "../servicos/servicoUsuario";

import ESTADO from "./estados";
import { act } from "react";

export const buscarUsuarios =  createAsyncThunk('consultarUsuario', async() =>{

    const resultado = await consultarUsuario();
   
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Usuarios recuperados com sucesso",
                "listaDeUsuario":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar os usuarios do Backend",
                "listaDeUsuario":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDeUsuario":[]
        }
    }
        
});
export const inserirUsuarioReducer = createAsyncThunk('gravarUsuario', async(usuario)=>{
    
        console.log(usuario);
        const resultado = await gravarUsuario(usuario);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    usuario,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const editarUsuarioReducer = createAsyncThunk('alterarUsuario', async(usuario)=>{
   
        console.log(usuario);
        const resultado = await alterarUsuario(usuario);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    usuario,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const apagarUsuarioReducer = createAsyncThunk('excluirUsuario', async (usuario)=>{

        console.log(usuario);
        const resultado = await excluirUsuario(usuario);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    usuario,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 
});

const usuarioReducer = createSlice({
    name:'usuario',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeUsuario:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarUsuarios.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando usuarios)"
        })
        .addCase(buscarUsuarios.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeUsuario=action.payload.listaDeUsuario;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuario=action.payload.listaDeUsuario;
          } 
        })
        .addCase(buscarUsuarios.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuario=action.payload.listaDeUsuario;
        })
        .addCase(apagarUsuarioReducer.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem= "Processando requisição (Excluindo Usuario)";
        })
        .addCase(apagarUsuarioReducer.fulfilled,(state,action) =>{
            if (action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                if (action.payload.usuario){
                    state.listaDeUsuario = state.listaDeUsuario.filter((usuario)=>
                        usuario.id !== action.payload.usuario.id
                    );
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }

        })
        .addCase(apagarUsuarioReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""
        })
        .addCase(editarUsuarioReducer.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (Atualizando usuario)";
        })
        .addCase(editarUsuarioReducer.fulfilled,(state,action) =>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.usuario){
                    const i = state.listaDeUsuario.findIndex((usuario) => usuario.id === action.payload.usuario.id);
                    state.listaDeUsuario[i] = action.payload.usuario;
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
           
        })
        .addCase(editarUsuarioReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem= action.payload.mensagem;
        })
        .addCase(inserirUsuarioReducer.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (Cadastrando usuario)"
        })
        .addCase(inserirUsuarioReducer.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.usuario)
                {
                    state.listaDeUsuario.push(action.payload.usuario);
                }
                else
                {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            }
        })
    }   
});

export default usuarioReducer.reducer;