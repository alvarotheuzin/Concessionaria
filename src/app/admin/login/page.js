"use client";

import Pagina from "@/app/components/page";
import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "../../styles/style.css";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find((user) => user.username === username && user.password === password);

        if (user) {
            router.push("/admin");
        } else {
            setError("Usuário ou senha inválidos.");
        }
    };

    const handleRegisterRedirect = () => {
        router.push("/admin/login/register");
    };

    return (
        <Pagina>
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="login-card" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Login Logista</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome de usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit" className="mt-3">
                                Login
                            </Button>
                            <Button 
                                variant="secondary" 
                                className="mt-3" 
                                onClick={handleRegisterRedirect}
                            >
                                Registrar-se
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </Pagina>
    );
}