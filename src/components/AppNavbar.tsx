import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";

export const AppNavbar: React.FC = () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className='mt-0'>
            {/*as: ép kiểu cho Navbar.Brand render thành component khác (ở đây là Link của react-router-dom */}
            {/* <Link to="/"> tạo một link nội bộ (client-side routing) tới đường dẫn / mà không reload trang. */}
            <Navbar.Brand as={Link} to="/" className="text-white">TicketManager</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav"></Navbar.Toggle>
            <Navbar.Collapse id="main-nav">
                <Nav className="ms-auto">
                    {/* {['coach', 'movie', 'flight', 'train'].map(path => (
                        <LinkContainer key={path} to={`/${path}`}>
                            <NavLink className="text-uppercase">
                                {path == 'coach' ? 'Xe khách'
                                    : path == 'movie' ? 'Phim'
                                        : path == 'flight' ? 'Máy bay'
                                            : 'Tàu hỏa'}
                            </NavLink>
                        </LinkContainer>
                    ))} */}
                    <Nav.Link as={Link} to="/bus">Xe</Nav.Link>
                    <Nav.Link as={Link} to="/movie">Phim</Nav.Link>
                    <Nav.Link as={Link} to="/flight">Máy bay</Nav.Link>
                    <Nav.Link as={Link} to="/train">Tàu hỏa</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>

    </Navbar>
);