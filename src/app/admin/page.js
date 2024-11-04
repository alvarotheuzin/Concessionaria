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

    const cardStyle = {
        height: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    const imageStyle = {
        height: '160px',
        objectFit: 'cover'
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
            <Link href="/admin/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            {carros.length > 0 ? (
                <Row>
                    {carros.map((carro, i) => (
                        <Col key={i} sm={12} md={6} lg={4} xl={3} className="mb-4" style={{ flexBasis: '20%' }}>
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
                                        R$ {carro.valor}
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
