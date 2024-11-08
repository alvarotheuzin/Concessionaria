'use client';

import Pagina from "@/app/components/page";
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/router';

const DetalhesCarro = () => {
  const [carro, setCarro] = useState(null);
  const [isClient, setIsClient] = useState(false); // Usar um estado para saber se é no cliente
  const router = useRouter();  // Definição do router
  const { id } = router.query;  // Captura o parâmetro da URL (id)

  // Definir como cliente após montagem do componente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id && isClient) {  // Certificar que 'id' e 'isClient' estão prontos
      const carros = JSON.parse(localStorage.getItem('carros')) || [];
      const carroSelecionado = carros.find(carro => carro.id === id);  // Busca pelo 'id' específico

      if (carroSelecionado) {
        setCarro(carroSelecionado);
      } else {
        setCarro(null);
      }
    }
  }, [id, isClient]);  // O segundo argumento garante que o efeito só rodará quando id ou isClient mudarem

  if (!carro) return <p>Carro não encontrado.</p>;  // Caso não encontre o carro, retorna uma mensagem

  return (
    <Pagina>
      <Container className="my-5">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Carousel style={{ maxWidth: '800px' }}>
            {carro.imagem ? (
              <Carousel.Item>
                <img
                  src={carro.imagem}
                  alt={`Imagem do carro ${carro.nome}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
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

          <Card className="mt-5" style={{ width: '100%', maxWidth: '1000px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
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
};

export default DetalhesCarro;