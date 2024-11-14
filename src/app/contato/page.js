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
        setClientes(JSON.parse(localStorage.getItem('contatos')) || []);
    }, []);

    const excluir = (id) => {
        const clientesAtualizados = clientes.filter((cliente, index) => index !== id);
        setClientes(clientesAtualizados);
        localStorage.setItem('contatos', JSON.stringify(clientesAtualizados));
    };

    return (
        <Pagina titulo="Clientes">
            <br />

            {clientes.length > 0 ? (
                <Table striped bordered hover responsive className="shadow-sm rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>Carro Selecionado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, i) => (
                            <tr key={i}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.carroSelecionado}</td>
                                <td className="d-flex justify-content-around">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="shadow-sm"
                                        onClick={() => excluir(i)}
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
