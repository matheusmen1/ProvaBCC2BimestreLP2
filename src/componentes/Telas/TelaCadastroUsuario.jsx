import { Alert } from "react-bootstrap";
import FormCadUsuario from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
//import { produtos } from "../../dados/mockProdutos";
//import { consultarProduto } from "../../servicos/servicoProduto";
export default function TelaCadastroUsuario(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    //const [listaDeProdutos, setListaDeProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [produtos, setProdutos] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id:0,
        nickname:"",
        urlAvatar:"",
        dataIngresso:"",
        senha:"",
        mensagens: {}
        //categoria: {}
    });
 
    //#mensagens = [];
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro Usuario
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuarios 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setUsuarioSelecionado={setUsuarioSelecionado} /> :
                        <FormCadUsuario
                                         setExibirTabela={setExibirTabela}
                                         usuarioSelecionado={usuarioSelecionado}
                                         setUsuarioSelecionado={setUsuarioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}