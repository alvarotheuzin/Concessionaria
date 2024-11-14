'use client';

import Pagina from "@/app/components/page";
import carrosValidator from "@/validators/carrosValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { mask } from "remask";

export default function Page() {
    const route = useRouter();
    const params = useParams();

    const tiposCambio = ["Automático", "Manual"];
    const tiposModelo = ["Hatch", "Sedã", "SUV", "Picapes", "Perua", "Esportivo"];
    const tiposDirecao = ["Hidráulica", "Elétrica", "Mecânica", "Direção Assistida"];
    const anosFabricacao = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    const dados = carros.find(item => item.id == params.id);
    const carro = dados || { nome: '', marca: '', valor: '', imagem: '', imagem2: '', imagem3: '', ano: '', direcao: '', cambio: '', motor: '', cor: '', portas: '' };

    const [valorFormatado, setValorFormatado] = useState("");

    function salvar(dados) {
        if (dados.id) {
            const index = carros.findIndex(item => item.id === dados.id);
            if (index > -1) carros[index] = dados;
        } else {
            dados.id = uuidv4();
            carros.push(dados);
        }

        localStorage.setItem('carros', JSON.stringify(carros));
        route.push('/admin');
    }

    useEffect(() => {
        if (carro.valor) {
            const valorInic = (parseFloat(carro.valor) || 0).toFixed(2).toString().replace(".", ",");
            setValorFormatado(`R$ ${mask(valorInic, ['9.999.999,99'])}`);
        }
    }, [carro.valor]);

    return (
        <Pagina>
            <br />
            <br />
            <Formik
                initialValues={carro}
                validationSchema={carrosValidator}
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
                        
                        <Form.Group className="mb-4" controlId="imagem">
                            <Form.Label>Link da Imagem 1</Form.Label>
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

                        <Form.Group className="mb-4" controlId="imagem2">
                            <Form.Label>Link da Imagem 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem2"
                                value={values.imagem2}
                                onChange={handleChange}
                                isInvalid={errors.imagem2}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagem2}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="imagem3">
                            <Form.Label>Link da Imagem 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem3"
                                value={values.imagem3}
                                onChange={handleChange}
                                isInvalid={errors.imagem3}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagem3}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="ano">
                            <Form.Label>Ano de Fabricação</Form.Label>
                            <Form.Control
                                as="select"
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
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.ano}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="direcao">
                            <Form.Label>Tipo de Direção</Form.Label>
                            <Form.Select
                                name="direcao"
                                value={values.direcao}
                                onChange={handleChange}
                                isInvalid={errors.direcao}
                            >
                                <option value="">Selecione o tipo de Direção</option>
                                {tiposDirecao.map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.direcao}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="cambio">
                            <Form.Label>Câmbio</Form.Label>
                            <Form.Select
                                name="cambio"
                                value={values.cambio}
                                onChange={handleChange}
                                isInvalid={errors.cambio}
                            >
                                <option value="">Selecione o tipo de câmbio</option>
                                {tiposCambio.map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.cambio}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="motor">
                            <Form.Label>Motor</Form.Label>
                            <Form.Control
                                type="text"
                                name="motor"
                                value={values.motor}
                                onChange={handleChange}
                                isInvalid={errors.motor}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.motor}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="cor">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control
                                type="text"
                                name="cor"
                                value={values.cor}
                                onChange={handleChange}
                                isInvalid={errors.cor}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cor}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="portas">
                            <Form.Label>Portas</Form.Label>
                            <Form.Control
                                type="number"
                                name="portas"
                                value={values.portas}
                                onChange={handleChange}
                                isInvalid={errors.portas}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.portas}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="danger" type="submit" className="me-2">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/admin">
                                <Button variant="danger">
                                    <MdOutlineArrowBack /> Voltar
                                </Button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
