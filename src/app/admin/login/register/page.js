"use client";

import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretPassword, setSecretPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        if (secretPassword !== "batata") {
            setError("A senha do Lojista está incorreta.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.some((user) => user.username === username);

        if (userExists) {
            setError("Usuário já cadastrado.");
            return;
        }

        const newUser = { username, password, secretPassword };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        router.push("/admin/login");
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="registercard">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4">Registrar</h2>
                            {error && (
                                <Alert variant="danger" className="text-center">
                                    {error}
                                </Alert>
                            )}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label className="escrita">Usuário</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu nome de usuário"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label className="escrita">Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSecretPassword" className="mb-3">
                                    <Form.Label className="escrita">Senha do Lojista</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite a senha do lojista"
                                        value={secretPassword}
                                        onChange={(e) => setSecretPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button variant="danger" type="submit" className="mt-3 escrita2">
                                        Registrar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
