'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "@/app/components/page";
import { useRouter } from "next/navigation";

export default function Desejos() {
    const [desejos, setDesejos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const route = useRouter();

    useEffect(() => {
        setDesejos(JSON.parse(localStorage.getItem('desejos')) || []);
        setClientes(JSON.parse(localStorage.getItem('clientes')) || []);
    }, []);

    const excluir = (id) => {
        const desejosAtualizados = desejos.filter(desejo => desejo.id !== id);
        setDesejos(desejosAtualizados);
        localStorage.setItem('desejos', JSON.stringify(desejosAtualizados));
    };

    return (
        <Pagina titulo="Desejos">
            <br />
            <div className="text-center mb-4">
                <Link href="/desejos/form" className="btn btn-primary mb-3 shadow-sm">
                    <FaPlusCircle /> Novo Desejo
                </Link>
            </div>

            {desejos.length > 0 ? (
                <Table striped bordered hover responsive className="shadow-sm rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>Cliente</th>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {desejos.map((desejo, i) => {
                            const cliente = clientes.find(client => client.id === desejo.clienteSelecionado);
                            return (
                                <tr key={i}>
                                    <td>{cliente ? cliente.nome : 'Cliente não encontrado'}</td>
                                    <td>{desejo.nome}</td>
                                    <td>{desejo.marca}</td>
                                    <td>{desejo.modelo}</td>
                                    <td className="d-flex justify-content-around">
                                        <Link href={`/desejos/form/${desejo.id}`}>
                                            <Button variant="outline-primary" size="sm" className="shadow-sm">
                                                <FaRegEdit title="Editar" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="shadow-sm"
                                            onClick={() => excluir(desejo.id)}
                                        >
                                            <MdDelete title="Excluir" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">Nenhum desejo cadastrado.</p>
            )}
        </Pagina>
    );
}
