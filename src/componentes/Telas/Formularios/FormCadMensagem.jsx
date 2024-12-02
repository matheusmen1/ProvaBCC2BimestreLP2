import { Button, Col, Form, InputGroup, Row} from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";


import { buscarMensagensReducer, inserirMensagemReducer } from '../../../redux/mensagemReducer';


export default function FormCadMensagem(props) {
    const [mensagem, setMensagem] = useState(props.mensagemSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarMensagensReducer());
    },[despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

    
             despachante(inserirMensagemReducer(mensagem));
    
            
                props.setMensagem({
                id:0,
                dataHora:"",
                lida:true,
                mensagem:[],
                });
                props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setMensagem({ ...mensagem, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>data e hora</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="dataHora"
                            name="dataHora"
                            aria-describedby="dataHora"
                            value={mensagem.dataHora}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a data e hora
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>mensagem:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="mensagem"
                            name="mensagem"
                            aria-describedby="mensagem"
                            value={mensagem.mensagem}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a mensagem do usuario!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{"Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
          
        </Form>
        
    );
}