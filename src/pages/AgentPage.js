import { Button, Col, Container, Row, Form } from "react-bootstrap";
import useEscrow from '../hooks/useEscrow';
import usePools from '../hooks/usePools';
import {getEscrowContract, release, getErc20Contract,setErc20ContractAddress } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";
const AgentPage = () => {
    const escrow = useEscrow();
    const escrowContract = getEscrowContract(escrow);
    const {pools, poolCount} = usePools(escrowContract);
    const { account} = useWeb3React();
    //console.log("pools = ", pools?.toNumber());
    return  (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {pools.map((pool, key) => (
                                <>
                                    <Form.Label>Pool {key}</Form.Label>
                                    <div>token:{pool?.token}</div>
                                    <div>sender:{pool?.sender}</div>
                                    <div>recipient:{pool?.recipient}</div>
                                    <div>agent:{pool?.agent}</div>
                                     <Button variant="dark" onClick={async () => {
                                        try {
                                            let txHash;
                                            
                                            txHash = await release(
                                                escrowContract,
                                                key,
                                                account,
                                            );
                                        
                                            console.log(txHash);
                                            
                                        } catch (e) {
                                            console.log(e);
                                            
                                        }
                                     }}>Release
                                    </Button>
                                     <div></div>
                                </>
                            ))
                            }
                        </Form.Group>
                       

                    </Form>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default AgentPage;