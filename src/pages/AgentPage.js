import { Button, Col, Container, Row, Form } from "react-bootstrap";
import useEscrow from '../hooks/useEscrow';
import usePools from '../hooks/usePools';
import {getEscrowContract, depositByEth, getErc20Contract,setErc20ContractAddress } from '../contracts/utils'
const AgentPage = () => {
    const escrow = useEscrow();
    const escrowContract = getEscrowContract(escrow);
    const {pools, poolCount} = usePools(escrowContract);
    //console.log("pools = ", pools?.toNumber());
    return  (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Pool {poolCount}</Form.Label>
                            <div>sender:{pools?.sender}</div>
                            <div>recipient:{pools?.recipient}</div>
                            <div>agent:{pools?.agent}</div>
                        </Form.Group>
                        <Button variant="dark">Release</Button>

                    </Form>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default AgentPage;