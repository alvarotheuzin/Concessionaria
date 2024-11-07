import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import Image from 'next/image';
import logo from '../components/logo.png';

export default function Pagina(props) {
    return (
        <>
            <Navbar className="custom-navbar" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={180}
                            className="my-custom-logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mx-auto">
                            <NavDropdown title="Populares" id="nav-dropdown-hatch">
                                <NavDropdown.Item href="/populares">Lista</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/populares/form">Novos Populares</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="SUVs" id="nav-dropdown-suvs">
                                <NavDropdown.Item href="/suvs">Listar</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/suvs/form">Nova SUV</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Sedan" id="nav-dropdown-sedan">
                                <NavDropdown.Item href="/sedans">Listar</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/sedans/form">Novo Sedan</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<FaUser />} id="nav-dropdown-user" align="end">
                                <NavDropdown.Item href="/admin/login">Sou Logista</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/admin/login">Sair</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                {props.children}
            </Container>

            <footer className="footer">
                <div className="footer-top"></div>
                <div className="footer-middle">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={180}
                        className="footer-custom-logo"
                    />
                </div>
                <div className="footer-bottom">
                    <Container>
                        <p className="footer-text text-center">&copy; Álvaro</p>
                    </Container>
                </div>
            </footer>
        </>
    );
}
