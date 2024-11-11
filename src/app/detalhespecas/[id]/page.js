"use client";

import Pagina from "@/app/components/page";
import { useState, useEffect } from "react";
import { Button, Row, Container, Card, Image, Form, Col } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { mask } from "remask";
import "@/app/styles/style2.css";

export default function DetalhesPeca({ params }) {
  const router = useRouter();
  const [peca, setPeca] = useState(null);
  const [pecaId, setPecaId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", pecaSelecionada: "" });
  const [pecasCadastradas, setPecasCadastradas] = useState([]);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setPecaId(resolvedParams.id);
    }

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (pecaId) {
      const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
      const pecaEncontrada = pecas.find(peca => peca.id === pecaId);
      setPeca(pecaEncontrada || {});
    }
  }, [pecaId]);

  useEffect(() => {
    const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    setPecasCadastradas(pecas);
  }, []);

  const formatarValor = (valor) => {
    const valorDecimal = parseFloat(valor) || 0;
    return valorDecimal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).replace("R$", "R$ ");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.push(formData);
    localStorage.setItem('contatos', JSON.stringify(contatos));
  };

  const handleTelefoneChange = (e) => {
    const { name, value } = e.target;
    const maskedValue = mask(value, "(99) 99999-9999");
    setFormData({ ...formData, [name]: maskedValue });
  };

  if (!peca) return null;

  return (
    <Pagina>
      <Container fluid className="p-">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Row className="w-100 mx-0 justify-content-center">
            <Col xs={12} md={6} className="d-flex justify-content-center p-1">
              <Image
                src={peca.imagem || "https://via.placeholder.com/600x600.png?text=Imagem+Principal+Indispon%C3%ADvel"}
                alt={`Imagem principal da peça ${peca.nome}`}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '5px'
                }}
                fluid
              />
            </Col>
          </Row>

          <Row className="w-100 mt-4 mb-4" style={{ maxWidth: '1200px' }}>
            <Col md={6}>
              <Card className="carddetalhe">
                <Card.Body>
                  <Card.Title className="text-center escrita" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {peca.nome}
                  </Card.Title>

                  <Row className="text-center mt-4">
                    <div className="col">
                      <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Marca:</strong> {peca.marca}</p>
                    </div>
                    <div className="col">
                      <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Quantidade:</strong> {peca.quantidade}</p>
                    </div>
                  </Row>

                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      variant="danger"
                      onClick={() => router.back()}
                      className="px-4 py-2"
                      style={{ fontSize: '1.1rem', borderRadius: '20px' }}
                    >
                      Voltar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-4 custom-card">
                <Card.Body>
                  <div className="col d-flex justify-content-center">
                    <p style={{
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: '#28a745',
                      textAlign: 'center'
                    }}>
                      {formatarValor(peca.valor)}
                    </p>
                  </div>
                  <Card.Title className="text-center mb-4" style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                    <p style={{ marginBottom: '0' }}>Sentiu Interesse?</p>
                    <p style={{ fontSize: '1.0rem', fontWeight: 'bold', marginTop: '-2px' }}>Entraremos em Contato</p>
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome" className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        style={{ borderRadius: '20px' }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ borderRadius: '20px' }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formTelefone" className="mb-3">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Digite seu telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleTelefoneChange}
                        style={{ borderRadius: '20px' }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formPeca" className="mb-3">
                      <Form.Label>Selecione uma Peça</Form.Label>
                      <Form.Control
                        as="select"
                        name="pecaSelecionada"
                        value={formData.pecaSelecionada}
                        onChange={handleChange}
                        style={{ borderRadius: '20px' }}
                      >
                        <option value="">Escolha uma peça</option>
                        {pecasCadastradas.map((peca) => (
                          <option key={peca.id} value={peca.id}>
                            {peca.nome} ({peca.marca})
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button
                        variant="danger"
                        type="submit"
                        className="px-4 py-2"
                        style={{ fontSize: '1.1rem', borderRadius: '20px' }}
                      >
                        Enviar
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Pagina>
  );
}
