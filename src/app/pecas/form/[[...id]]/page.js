'use client';

import Pagina from "@/app/components/page";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";


export default function Page() {

    const route = useRouter();
    const params = useParams();

    const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    const dados = pecas.find(item => item.id == params.id);
    const peca = dados || { nome: '' };

    function salvar(dados) {
        if (dados.id) {
            const index = pecas.findIndex(item => item.id === dados.id);
            if (index > -1) pecas[index] = dados;
        } else {
            dados.id = v4()
            pecas.push(dados)
        }

        localStorage.setItem('pecas', JSON.stringify(pecas))
        return route.push('/pecas')
    }


    return (
        <Pagina>

            <Formik
                initialValues={peca}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="numero">
                            <Form.Label>Numero Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={values.numero}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="email">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.nome}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="danger">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/pecas"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>

                    </Form>
                )}
            </Formik>

        </Pagina>
    );
}