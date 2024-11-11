'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "@/app/components/page";

export default function Pecas() {
    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        setPecas(JSON.parse(localStorage.getItem('pecas')) || []);
    }, []);

    const excluir = (id) => {
        const pecasAtualizadas = pecas.filter(peca => peca.id !== id);
        setPecas(pecasAtualizadas);
        localStorage.setItem('pecas', JSON.stringify(pecasAtualizadas));
    };

    const formatarValor = (valor) => {
        const valorDecimal = parseFloat(valor) || 0;
        return valorDecimal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).replace("R$", "R$ ");
    };

    const cardStyle = {
        height: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    };

    const imageStyle = {
        height: '300px',
        objectFit: 'cover',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    };

    const motorStyle = {
        fontSize: '0.75rem',
        color: '#6c757d',
    };

    const valorStyle = {
        fontSize: '1.0rem',
        fontWeight: 'bold',
        marginTop: 'auto',
        color: '#28a745',
    };

    const anoStyle = {
        fontSize: '0.75rem',
        color: '#6c757d',
    };

    return (
        <Pagina titulo="Peças">
            <br />
            <div className="text-center mb-4">
                <Link href="/pecas/form" className="btn btn-primary shadow-sm">
                    <FaPlusCircle /> Nova Peça
                </Link>
            </div>

            {pecas.length > 0 ? (
                <Row>
                    {pecas.map((peca, i) => (
                        <Col key={i} sm={12} md={6} lg={4} xl={3} className="mb-4">
                            <Card
                                style={cardStyle}
                                className="shadow-sm"
                                onMouseEnter={(e) => e.currentTarget.style = cardHoverStyle}
                                onMouseLeave={(e) => e.currentTarget.style = cardStyle}
                            >
                                <Card.Img
                                    variant="top"
                                    src={peca.imagem}
                                    alt={`Imagem da peça ${peca.nome}`}
                                    style={imageStyle}
                                />
                                <Card.Body>
                                    <Card.Title>{peca.nome}</Card.Title>
                                    <Card.Text style={motorStyle}>
                                        {peca.marca}
                                    </Card.Text>
                                    <Card.Text style={valorStyle}>
                                        {formatarValor(peca.valor)}
                                    </Card.Text>
                                    <Card.Text style={anoStyle}>
                                        Quantidade: {peca.quantidade}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Link href={`/pecas/form/${peca.id}`}>
                                        <Button variant="outline-primary" size="sm" className="shadow-sm">
                                            <FaRegEdit title="Editar" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="shadow-sm"
                                        onClick={() => excluir(peca.id)}
                                    >
                                        <MdDelete title="Excluir" />
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">Nenhuma peça cadastrada.</p>
            )}
        </Pagina>
    );
}
