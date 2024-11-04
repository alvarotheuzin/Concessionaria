'use client';

import Pagina from "./components/page";
import { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Image, Row, Form } from "react-bootstrap";
import Link from "next/link";
import styles from './styles/style.css';

export default function Home() {
  const [carros, setCarros] = useState([]);
  const [filtro, setFiltro] = useState({
    valorMaximo: '',
    marca: '',
    ano: '',
    modelo: ''
  });

  useEffect(() => {
    setCarros(JSON.parse(localStorage.getItem('carros')) || []);
  }, []);

  const aplicarFiltro = () => {
    return carros.filter(carro => {
      const valorValido = filtro.valorMaximo ? carro.valor <= filtro.valorMaximo : true;
      const marcaValida = filtro.marca ? carro.marca.toLowerCase().includes(filtro.marca.toLowerCase()) : true;
      const anoValido = filtro.ano ? carro.ano === filtro.ano : true;
      const modeloValido = filtro.modelo ? carro.modelo.toLowerCase().includes(filtro.modelo.toLowerCase()) : true;
      return valorValido && marcaValida && anoValido && modeloValido;
    });
  };

  const carrosFiltrados = aplicarFiltro();

  const handleChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
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

  return (
    <div>
      <Pagina>
        <div className="full-width-carousel mb-4">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tpc.googlesyndication.com/simgad/9741072406721062648?"
                alt="Slide 1"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tpc.googlesyndication.com/simgad/9741072406721062648?"
                alt="Slide 2"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tpc.googlesyndication.com/simgad/9741072406721062648?"
                alt="Slide 3"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="lo mb-4">Lojas Oficiais</div>

        <Container className="circle-container mb-4">
          <a href="#link1">
            <Image src="https://i.pinimg.com/736x/c8/22/db/c822db8663c659917e7a629bbb858ddf.jpg" className="custom-circle" />
          </a>
          <a href="#link2">
            <Image src="https://i.pinimg.com/736x/3c/f6/3f/3cf63f3e54f7ba8cddb3e9e070c7389d.jpg" className="custom-circle" />
          </a>
          <a href="#link3">
            <Image src="https://i.pinimg.com/736x/95/ed/5f/95ed5f9b09bf823d0304598ad3796840.jpg" className="custom-circle" />
          </a>
          <a href="#link4">
            <Image src="https://i.pinimg.com/736x/59/3f/d3/593fd392e1d485989e61865ed5f7c2ff.jpg" className="custom-circle" />
          </a>
          <a href="#link5">
            <Image src="https://i.pinimg.com/736x/5e/64/68/5e6468b00af6fd05e8c9d3ca82c6beda.jpg" className="custom-circle" />
          </a>
          <a href="#link6">
            <Image src="https://i.pinimg.com/736x/d2/ad/86/d2ad8693713237e9eef48b4f6fa5fa5f.jpg" className="custom-circle" />
          </a>
          <a href="#link7">
            <Image src="https://i.pinimg.com/736x/71/1f/f6/711ff67d48c1da298ae576f1339c93e8.jpg" className="custom-circle" />
          </a>
          <a href="#link8">
            <Image src="https://i.pinimg.com/736x/15/69/dc/1569dc84ca1553fee5020868755d1b73.jpg" className="custom-circle" />
          </a>
        </Container>

        <div className="background">
        <Form className="mb-4">
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="valorMaximo">
                <Form.Label className="escrita">Valor Máximo</Form.Label>
                <Form.Control
                  type="text"
                  name="valorMaximo"
                  value={filtro.valorMaximo}
                  onChange={handleChange}
                  placeholder="R$"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="marca">
                <Form.Label className="escrita">Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={filtro.marca}
                  onChange={handleChange}
                  placeholder="Marca do carro"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="ano">
                <Form.Label className="escrita">Ano</Form.Label>
                <Form.Control
                  type="text"
                  name="ano"
                  value={filtro.ano}
                  onChange={handleChange}
                  placeholder="Ano do carro"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="modelo">
                <Form.Label className="escrita">Modelo</Form.Label>
                <Form.Control
                  type="text"
                  name="modelo"
                  value={filtro.modelo}
                  onChange={handleChange}
                  placeholder="Modelo do carro"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        </div>

        {carrosFiltrados.length > 0 ? (
          <Row>
            {carrosFiltrados.map((carro, i) => (
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
                    <Card.Text>
                      {carro.motor}
                    </Card.Text>
                    <Card.Text>
                      R$ {carro.valor}
                    </Card.Text>
                    <Card.Text>
                      Ano: {carro.ano}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">Nenhum carro cadastrado.</p>
        )}
      </Pagina>
    </div>
  );
}