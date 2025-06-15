import React, { useState } from "react";
import {
    Navbar,
    Container,
    Nav,
    InputGroup,
    Form,
    Button,
    NavDropdown
} from "react-bootstrap";
import {
    Search,
    Zap, // Icon cho "Thạo tốc"
    Settings, // Icon cho "Cấu hình"
    Camera, // Icon cho "Chụp ảnh"
    MessageSquare, // Icon cho "Chat"
    UserCircle, // Icon cho người dùng
    User2,
    User2Icon,
    User
} from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Navbar bg="primary" expand="lg" className="border-bottom shadow-sm">
            <Container fluid className="px-3">
                {/* Phần bên trái: Brand */}
                <Navbar.Brand href="#home" className="text-light">
                    Thịnh Phát - Bến Tre
                </Navbar.Brand>

                {/* Phần giữa: Các nút chức năng và thanh tìm kiếm */}
                <div className="d-flex flex-grow-1">

                    {/* Thanh tìm kiếm */}
                    <div style={{ minWidth: '700px', maxWidth: '850px' }} className="ms-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Nhập vào số điện thoại"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}

                            ></Form.Control>
                        </InputGroup>
                    </div>
                </div>

                {/* Phần bên phải: Chat và User */}
                <Nav className="d-flex flex-row align-items-center">
                    <Nav.Link href="#BookTicket" className="d-flex align-items-center text-light">
                        <span>Đặt vé</span>
                    </Nav.Link>
                    <Nav.Link href="#user" className="d-flex align-items-center text-light">
                        <User size={18} className=" text-light" />
                        <span>Ngã 4H</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}