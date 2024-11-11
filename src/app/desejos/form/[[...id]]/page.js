'use client';

import { useState } from "react";
import Pagina from "@/app/components/page";
import desejosValidator from "@/validators/desejosValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page() {

    const route = useRouter();
    const params = useParams();

    const tiposModelo = ["Hatch", "Sedã", "SUV", "Picapes", "Perua", "Esportivo"];
    const anosFabricacao = Array.from({ length: 30 }, (_, i) => 2024 - i);
    const [salvoComSucesso, setSalvoComSucesso] = useState(false);

    const desejos = JSON.parse(localStorage.getItem('desejos')) || [];
    const dados = desejos.find(item => item.id == params.id);
    const desejo = dados || { nome: '', marca: '', modelo: '', ano: '', portas: '' };

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    function salvar(dados) {
        if (dados.id) {
            const index = desejos.findIndex(item => item.id === dados.id);
            if (index > -1) desejos[index] = dados;
        } else {
            dados.id = v4();
            desejos.push(dados);
        }

        localStorage.setItem('desejos', JSON.stringify(desejos));
        setSalvoComSucesso(true);
    }

    return (
        <Pagina>
            <br />
            <br />
            <Formik
                initialValues={desejo}
                validationSchema={desejosValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors
                }) => (
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formCliente" className="mb-3">
                            <Form.Label>Selecione um Cliente</Form.Label>
                            <Form.Control
                                as="select"
                                name="clienteSelecionado"
                                value={values.clienteSelecionado}
                                onChange={handleChange}
                                isInvalid={errors.clienteSelecionado}
                                style={{ borderRadius: '20px' }}
                            >
                                <option value="">Escolha um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome} ({cliente.email})
                                    </option>
                                ))}
                            </Form.Control>
                            
                            <Form.Control.Feedback type="invalid">
                                {errors.clienteSelecionado}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="nome">
                            <Form.Label>Nome do Veículo</Form.Label>
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

                        <Form.Group className="mb-4" controlId="marca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="marca"
                                value={values.marca}
                                onChange={handleChange}
                                isInvalid={errors.marca}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.marca}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="modelo">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Select
                                name="modelo"
                                value={values.modelo}
                                onChange={handleChange}
                                isInvalid={errors.modelo}
                            >
                                <option value="">Selecione o modelo do veículo</option>
                                {tiposModelo.map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.modelo}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="ano">
                            <Form.Label>Ano de Fabricação</Form.Label>
                            <Form.Select
                                name="ano"
                                value={values.ano}
                                onChange={handleChange}
                                isInvalid={errors.ano}
                            >
                                <option value="">Selecione o ano</option>
                                {anosFabricacao.map((ano, index) => (
                                    <option key={index} value={ano}>
                                        {ano}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.ano}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="portas">
                            <Form.Label>Quantidade de Portas</Form.Label>
                            <Form.Control
                                type="number"
                                name="portas"
                                value={values.portas}
                                onChange={handleChange}
                                isInvalid={errors.portas}
                                max={5}
                                min={2}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.portas}
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
