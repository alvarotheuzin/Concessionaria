'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/page";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        setClientes(JSON.parse(localStorage.getItem('clientes')) || []);
    }, []);

    const excluir = (id) => {
        const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
        setClientes(clientesAtualizados);
        localStorage.setItem('clientes', JSON.stringify(clientesAtualizados));
    };

    return (
        <Pagina titulo="Clientes">
            <br />
            <div className="text-center mb-4">
                <Link href="/clientes/form" className="btn btn-primary mb-3 shadow-sm">
                    <FaPlusCircle /> Novo Cliente
                </Link>
            </div>

            {clientes.length > 0 ? (
                <Table striped bordered hover responsive className="shadow-sm rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, i) => (
                            <tr key={i}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.numero}</td>
                                <td>{cliente.email}</td>
                                <td className="d-flex justify-content-around">
                                    <Link href={`/admin/form/${cliente.id}`}>
                                        <Button variant="outline-primary" size="sm" className="shadow-sm">
                                            <FaRegEdit title="Editar" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="shadow-sm"
                                        onClick={() => excluir(cliente.id)}
                                    >
                                        <MdDelete title="Excluir" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">Nenhum cliente cadastrado.</p>
            )}
        </Pagina>
    );
}
