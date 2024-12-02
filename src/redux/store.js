import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuarioReducer";
import mensagemReducer from "./mensagemReducer";
const store = configureStore({
    reducer:{
        'usuario': usuarioReducer,
        'mensagem': mensagemReducer
    }
});
export default store;