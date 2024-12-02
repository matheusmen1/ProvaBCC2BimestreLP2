import { Alert } from "react-bootstrap";
import FormCadMensagem from "./Formularios/FormCadMensagem";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaMensagem from "./Tabelas/TabelaMensagem";

export default function TelaMensagem(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    
    const [mensagemSelecionado, setMensagemSelecionado] = useState({
        id:0,
        dataHora:"",
        lida:"",
        mensagem: {},
        usuario: {}
        
    });
   
  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Bate Papo
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaMensagem 
                                        setExibirTabela={setExibirTabela}
                                        setMensagemSelecionado={setMensagemSelecionado} /> :
                        <FormCadMensagem
                                         setExibirTabela={setExibirTabela}
                                         mensagemSelecionado={mensagemSelecionado}
                                         setMensagemSelecionado={setMensagemSelecionado}
                                         />
                }
            </Pagina>
        </div>
    );

}