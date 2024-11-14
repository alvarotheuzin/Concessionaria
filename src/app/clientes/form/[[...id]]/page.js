'use client';

import { useState } from "react";
import Pagina from "@/app/components/page";
import formValidator from "@/validators/formValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask } from "remask";

export default function Page() {

    const route = useRouter();
    const params = useParams();
    const [salvoComSucesso, setSalvoComSucesso] = useState(false);

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const dados = clientes.find(item => item.id == params.id);

    const cliente = dados || { nome: '', numero: '', email: '' };

    function salvar(dados) {
        if (dados.id) {
            const index = clientes.findIndex(item => item.id === dados.id);
            if (index > -1) clientes[index] = dados;
        } else {
            dados.id = v4();
            clientes.push(dados);
        }

        localStorage.setItem('clientes', JSON.stringify(clientes));
        setSalvoComSucesso(true); 
    }

    return (
        <Pagina>
            <br />
            <br />
            <Formik
                initialValues={cliente}
                validationSchema={formValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                isInvalid={errors.nome}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="numero">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={values.numero}
                                onChange={e =>
                                    setFieldValue(
                                        "numero",
                                        mask(targete.value, ["(99) 99999-9999"])
                                    )
                                }
                                isInvalid={errors.numero}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.numero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="email">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="danger">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>

                        {salvoComSucesso && (
                            <Alert variant="success" className="mt-4 text-center">
                                Dados salvos com sucesso!
                            </Alert>
                        )}
                    </Form>
                )}
            </Formik>
            <br />
            <br />
        </Pagina>
    );
}
