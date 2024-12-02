import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagens, gravarMensagem, editarMensagem, excluirMensagem } from "../servicos/servicoMensagem";
import ESTADO from "./estados";

export const buscarMensagensReducer = createAsyncThunk('mensagem/buscarMensagens', async (termo) => {
    try {
        const resultado = await consultarMensagens (termo);
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Mensagens recuperadas com sucesso",
                listaDeMensagem: resultado
            };
        } else {
            return {
                status: false,
                mensagem: "Erro ao recuperar mensagens do Backend",
                listaDeMensagem: []
            };
        }
    } catch (error) {
        return {
            status: false,
            mensagem: "Erro " + error.message,
            listaDeMensagem: []
        };
    }
});

export const inserirMensagemReducer = createAsyncThunk('mensagem/inserirMensagem', async (mensagem) => {
    try {
        const resultado = await gravarMensagem(mensagem);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            mensagem: resultado.mensagem
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro: " + erro.message
        };
    }
});

export const editarMensagemReducer = createAsyncThunk('mensagem/editarMensagem', async (mensagem) => {
    try {
        const resultado = await editarMensagem(mensagem);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro: " + erro.message
        };
    }
});


export const apagarMensagemReducer = createAsyncThunk('mensagem/excluirMensagem', async (mensagem) => {
    try {
        const resultado = await excluirMensagem(mensagem);
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro: " + erro.message
        };
    }
});

const mensagemReducer = createSlice({
    name: 'mensagem',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeMensagem: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagensReducer.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (buscando mensagens)";
            })
            .addCase(buscarMensagensReducer.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagem = action.payload.listaDeMensagem;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagem = [];
                }
            })
            .addCase(buscarMensagensReducer.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaDeMensagem = [];
            })

            .addCase(inserirMensagemReducer.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Cadastrando mensagem)";
            })
            .addCase(inserirMensagemReducer.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagem.push(action.payload.mensagem);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(inserirMensagemReducer.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(editarMensagemReducer.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Atualizando mensagem)";
            })
            .addCase(editarMensagemReducer.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const index = state.listaDeMensagem.findIndex(
                        (msg) => msg.id === action.payload.mensagem.id
                    );
                    if (index !== -1) {
                        state.listaDeMensagem[index] = action.payload.mensagem;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(editarMensagemReducer.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(apagarMensagemReducer.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Excluindo mensagem)";
            })
            .addCase(apagarMensagemReducer.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagem = state.listaDeMensagem.filter(
                        (msg) => msg.id !== action.payload.mensagem.id
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(apagarMensagemReducer.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
    }
});

export default mensagemReducer.reducer;
