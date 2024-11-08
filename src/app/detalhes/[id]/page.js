'use client';

import Pagina from "@/app/components/page";
import { useEffect, useState } from "react";
import { Button, Col, Row, Container, Card, Carousel } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import "@/app/styles/style2.css";

export default function DetalhesCarro({ params }) {
  const router = useRouter();
  const [carro, setCarro] = useState(null);
  const [carroId, setCarroId] = useState(null);

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

  if (!carro) return null;

  return (
    <Pagina>
      <Container>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Carousel style={{ maxWidth: '800px'  }} indicators={false} controls={false}>
            {carro.imagem ? (
              <Carousel.Item>
                <img
                  src={carro.imagem}
                  alt={`Imagem do carro ${carro.nome}`}
                  style={{ width: '100%', height: 'auto'}}
                />
              </Carousel.Item>
            ) : (
              <Carousel.Item>
                <img
                  src="https://via.placeholder.com/800x400.png?text=Imagem+Indispon%C3%ADvel"
                  alt="Imagem não disponível"
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </Carousel.Item>
            )}
          </Carousel>

          <Card className="carddetalhe">
            <Card.Body>
              <Card.Title className="text-center escrita" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                {carro.nome}
              </Card.Title>

              <Row className="text-center mt-4">
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Ano:</strong> {carro.ano}</p>
                </Col>
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Câmbio:</strong> {carro.cambio}</p>
                </Col>
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Marca:</strong> {carro.marca}</p>
                </Col>
              </Row>

              <Row className="text-center mt-3">
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Modelo:</strong> {carro.modelo}</p>
                </Col>
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Cor:</strong> {carro.cor}</p>
                </Col>
                <Col>
                  <p className="text-muted" style={{ fontSize: '1.2rem' }}><strong>Portas:</strong> {carro.portas}</p>
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="secondary"
                  onClick={() => router.back()}
                  className="px-4 py-2"
                  style={{ fontSize: '1.1rem' }}
                >
                  Voltar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Pagina>
  );
}
