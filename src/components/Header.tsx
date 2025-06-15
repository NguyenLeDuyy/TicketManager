import { Container, Navbar } from "react-bootstrap"

export const Header: React.FC = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Brand link</Navbar.Brand>
            </Container>
        </Navbar>
    )
}