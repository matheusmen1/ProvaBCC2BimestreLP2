import { Button, Col, Form, InputGroup, Row} from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";


import { buscarUsuarios, editarUsuarioReducer, inserirUsuarioReducer } from '../../../redux/usuarioReducer';


export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarUsuarios());
    },[despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
            
                despachante(inserirUsuarioReducer(usuario));
            }
            else {

                despachante(editarUsuarioReducer(usuario));
                props.setModoEdicao(false);
            }
            props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                id:0,
                nickname:"",
                urlAvatar:"",
                dataIngresso:"",
                senha:"",
                mensagens: {}
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
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nickname do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>url Avatar:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="urlAvatar"
                            name="urlAvatar"
                            aria-describedby="urlAvatar"
                            value={usuario.urlAvatar}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o url do avatar!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>senha:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="senha"
                            name="senha"
                            aria-describedby="senha"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a senha do usuario!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
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