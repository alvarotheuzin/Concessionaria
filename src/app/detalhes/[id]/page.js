'use client';

import Pagina from "@/app/components/page";
import { useState, useEffect } from "react";
import { Button, Row, Container, Card, Image, Form, Col } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { mask } from "remask";
import "@/app/styles/style2.css";

export default function DetalhesCarro({ params }) {
  const router = useRouter();
  const [carro, setCarro] = useState(null);
  const [carroId, setCarroId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", carroSelecionado: "" });
  const [carrosCadastrados, setCarrosCadastrados] = useState([]);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCarroId(resolvedParams.id);
    }

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (carroId) {
      const carros = JSON.parse(localStorage.getItem('carros')) || [];
      const carroEncontrado = carros.find(carro => carro.id === carroId);
      setCarro(carroEncontrado || {});
    }
  }, [carroId]);

  useEffect(() => {
    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    setCarrosCadastrados(carros);
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

  if (!carro) return null;

  return (
    <Pagina>
    <Container fluid className="p-">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <Row className="w-100 mx-0 g-2">
          <div className="col-4 text-center p-1">
            <Image
              src={carro.imagem2 || "https://via.placeholder.com/400x400.png?text=Imagem+Indispon%C3%ADvel"}
              alt={`Imagem lateral esquerda do carro ${carro.nome}`}
              style={{ width: '200%', height: '300px', objectFit: 'cover', borderRadius: '5px' }}
              fluid
            />
          </div>

          <div className="col-4 text-center p-1">
            <Image
              src={carro.imagem || "https://via.placeholder.com/600x600.png?text=Imagem+Principal+Indispon%C3%ADvel"}
              alt={`Imagem principal do carro ${carro.nome}`}
              style={{ width: '1000px', height: '300px', objectFit: 'cover', borderRadius: '5px' }}
              fluid
            />
          </div>

          <div className="col-4 text-center p-1">
            <Image
              src={carro.imagem3 || "https://via.placeholder.com/400x400.png?text=Imagem+Indispon%C3%ADvel"}
              alt={`Imagem lateral direita do carro ${carro.nome}`}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '5px' }}
              fluid
            />
          </div>
        </Row>

        <Row className="w-100 mt-4 mb-4" style={{ maxWidth: '1200px' }}>
          <Col md={6}>
            <Card className="carddetalhe">
              <Card.Body>
                <Card.Title className="text-center escrita" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {carro.nome}
                </Card.Title>

                <Row className="text-center mt-4">
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Ano:</strong> {carro.ano}</p>
                  </div>
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Câmbio:</strong> {carro.cambio}</p>
                  </div>
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Marca:</strong> {carro.marca}</p>
                  </div>
                </Row>

                <Row className="text-center mt-3">
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Modelo:</strong> {carro.modelo}</p>
                  </div>
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Cor:</strong> {carro.cor}</p>
                  </div>
                  <div className="col">
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Portas:</strong> {carro.portas}</p>
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
                    {formatarValor(carro.valor)}
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

                  <Form.Group controlId="formCarro" className="mb-3">
                    <Form.Label>Selecione um Carro</Form.Label>
                    <Form.Control
                      as="select"
                      name="carroSelecionado"
                      value={formData.carroSelecionado}
                      onChange={handleChange}
                      style={{ borderRadius: '20px' }}
                    >
                      <option value="">Escolha um carro</option>
                      {carrosCadastrados.map((carro) => (
                        <option key={carro.id} value={carro.id}>
                          {carro.nome} ({carro.marca} - {carro.ano})
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
