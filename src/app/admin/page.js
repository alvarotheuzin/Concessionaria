'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/page";

export default function Carros() {
    const [carros, setCarros] = useState([]);

    useEffect(() => {
        setCarros(JSON.parse(localStorage.getItem('carros')) || []);
    }, []);

    const excluir = (id) => {
        const carrosAtualizados = carros.filter(carro => carro.id !== id);
        setCarros(carrosAtualizados);
        localStorage.setItem('carros', JSON.stringify(carrosAtualizados));
    };

    const formatarValor = (valor) => {
        const valorDecimal = parseFloat(valor) || 0;
        return valorDecimal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).replace("R$", "R$ ");
    };

    const cardStyle = {
        height: '430px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    };

    const imageStyle = {
        height: '220px',
        objectFit: 'cover',
        borderTopLeftRadius: '15px', 
        borderTopRightRadius: '15px',
    };

    const motorStyle = {
        fontSize: '0.75rem',
        color: '#6c757d',
    };

    const valorStyle = {
        fontSize: '1.0rem',
        fontWeight: 'bold',
        marginTop: 'auto'
    };

    const anoStyle = {
        fontSize: '0.75rem',
        color: '#6c757d',
    };

    return (
        <Pagina titulo="Carros">
            <br />
            <div className="text-center mb-4">
                <Link href="/admin/form" className="btn btn-danger mx-2">
                    <FaPlusCircle /> Novo
                </Link>
                <Link href="/clientes" className="btn btn-danger mx-2">
                    Clientes
                </Link>
                <Link href="/pecas" className="btn btn-danger mx-2">
                    Peças
                </Link>
                <Link href="/desejos" className="btn btn-danger mx-2">
                    Desejos
                </Link>
                <Link href="/contato" className="btn btn-danger mx-2">
                    Contatos
                </Link>
            </div>

            {carros.length > 0 ? (
                <Row>
                    {carros.map((carro, i) => (
                        <Col key={i} sm={12} md={6} lg={4} xl={3} className="mb-4">
                            <Card style={cardStyle}>
                                <Card.Img
                                    variant="top"
                                    src={carro.imagem}
                                    alt={`Imagem do carro ${carro.nome}`}
                                    style={imageStyle}
                                />
                                <Card.Body>
                                    <Card.Title>{carro.nome}</Card.Title>
                                    <Card.Text style={motorStyle}>
                                        {carro.motor}
                                    </Card.Text>
                                    <Card.Text style={valorStyle}>
                                        {formatarValor(carro.valor)}
                                    </Card.Text>
                                    <Card.Text style={anoStyle}>
                                        Ano: {carro.ano}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Link href={`/admin/form/${carro.id}`}>
                                        <Button variant="outline-primary" size="sm">
                                            <FaRegEdit title="Editar" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => excluir(carro.id)}
                                    >
                                        <MdDelete title="Excluir" />
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">Nenhum carro cadastrado.</p>
            )}
        </Pagina>
    );
}
