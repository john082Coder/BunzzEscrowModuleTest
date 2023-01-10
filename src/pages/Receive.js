import { Button, Col, Container, Row, Form } from "react-bootstrap";

const Receive = () => {
    return  (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Receive Value</Form.Label>
                            <Form.Control type="email" placeholder="Enter Value" />
                        </Form.Group>
                        <Button variant="dark">Receive</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Receive;