'use client';

import Pagina from "@/app/components/page";
import pecasValidator from "@/validators/pecasValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask } from "remask";
import { useState, useEffect } from "react";


export default function Page() {

    const route = useRouter();
    const params = useParams();

    const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    const dados = pecas.find(item => item.id == params.id);
    const peca = dados || { nome: '', imagem: '', marca: '', quantidade: '' };

    const [valorFormatado, setValorFormatado] = useState("");

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

    useEffect(() => {
        if (peca.valor) {
            const valorInic = (parseFloat(peca.valor) || 0).toFixed(2).toString().replace(".", ",");
            setValorFormatado(`R$ ${mask(valorInic, ['9.999.999,99'])}`);
        }
    }, [peca.valor]);



    return (
        <Pagina>
            <br />
            <br />
            <Formik
                initialValues={peca}
                validationSchema={pecasValidator}
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

                        <Form.Group className="mb-4" controlId="imagem">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem"
                                value={values.imagem}
                                onChange={handleChange}
                                isInvalid={errors.imagem}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagem}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                name="valor"
                                value={valorFormatado}
                                onChange={e => {
                                    const valorDigitado = e.target.value;
                                    const valorNumerico = valorDigitado.replace(/[^0-9]/g, "");
                                    const valorDecimal = parseFloat(valorNumerico) / 100;

                                    setFieldValue("valor", valorDecimal);

                                    const valorCompleto = valorDecimal.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).replace("R$", "R$ ");

                                    setValorFormatado(valorCompleto);
                                }}
                                isInvalid={errors.valor}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.valor}
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

                        <Form.Group className="mb-4" controlId="quantidade">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantidade"
                                value={values.quantidade}
                                onChange={handleChange}
                                isInvalid={errors.quantidade}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.quantidade}
                            </Form.Control.Feedback>
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
            <br />
            <br />
        </Pagina>
    );
}