import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";

// redux
import { useSelector, useDispatch } from "react-redux";
import { buscarMensagensReducer, apagarMensagemReducer } from "../../../redux/mensagemReducer";
import ESTADO from "../../../redux/estados";
import { useEffect } from "react";

export default function TabelaMensagem(props) {

    const { estado, mensagem, listaDeMensagem } = useSelector(state => state.mensagem);
    const despachante = useDispatch();

    useEffect(() => {
        despachante(buscarMensagensReducer());
    }, [despachante]);

    function excluirMensagemSelecionada(mensagem) {
        if (window.confirm("Deseja realmente excluir o usuário " + mensagem.nickname)) {
            despachante(apagarMensagemReducer(mensagem));
        }
    }

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{mensagem}</Alert>
            </div>
        );
    }
    else if (estado === ESTADO.ERRO) {
        return (
            <div>
                <Alert variant="danger">{mensagem}</Alert>
            </div>
        );
    }
    else if (estado === ESTADO.OCIOSO) {
        return (
            <>
                <Container>
                    <Button className="mb-3" variant="primary"
                        onClick={() => {
                            props.setExibirTabela(false);
                        }}>
                        Adicionar
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <th>Id</th>
                            <th>dataHora</th>
                            <th>lida</th>
                            <th>mensagem</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            {
                                listaDeMensagem?.map((mensagem) => {
                                    return (
                                        <tr>
                                            <td>{mensagem.id}</td>
                                            <td>{mensagem.lida}</td>
                                            <td>{new Date(mensagem.dataHora).toLocaleDateString("pt-BR")}</td>
                                            <td>{mensagem.mensagem}</td>
                                            <td>
                                                <Button onClick={() => {
                                                    excluirMensagemSelecionada(mensagem);
                                                }} variant="danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <p>Quantidade de mensagens cadastrados: {listaDeMensagem.length}</p>
                </Container>
            </>
        );
    }

}
