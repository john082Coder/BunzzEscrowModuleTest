import { Button, Col, Container, Row, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import useFeePercent from "../hooks/useFeePercent";
import useEscrow from '../hooks/useEscrow';
import { bnToDec } from '../utils';
import {getEscrowContract, depositByEth } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";
import BigNumber from 'bignumber.js';
const Creator = () => {
    const escrow = useEscrow();
    const { account} = useWeb3React();
    const escrowContract = getEscrowContract(escrow);
    const [depositAmount, setDepositAmount] = useState(0);
    const [recipientAddress, setRecipientAddress] = useState("0x02Ed95beA37d4158B5dd3F496BAe6A85Ab2090f3");
    const [agentAddress, setAgentAddress] = useState("0x708aee3E6540239CfbE34811D2d542D72de8bd76");
    const feePercent = (useFeePercent(escrowContract));
   
   
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Amount</Form.Label>
                            <Form.Control type="email" placeholder="Enter Value" value={depositAmount} onChange={(val) => setDepositAmount(val.target.value)} />

                            <Form.Label>Input Token Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" />

                            <Form.Label>Input Recipient Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={recipientAddress} onChange={(val) => setRecipientAddress(val.target.value)} />

                            <Form.Label>Input Agent Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={agentAddress} onChange={(val) => setAgentAddress(val.target.value)} />

                        </Form.Group>
                        <Button className="mx-3" variant="dark" onClick={async () => {
                            try {
                                let txHash;
                                
                                  txHash = await depositByEth(
                                    escrowContract,
                                    depositAmount,
                                    recipientAddress,
                                    agentAddress,
                                    account,
                                 );
                               
                                console.log(txHash);
                                
                              } catch (e) {
                                console.log(e);
                                
                              }
                        }}>
                            DepositEth
                        </Button>
                        <Button variant="dark">DepositToken</Button>
                    </Form>
                    {(feePercent?feePercent.toNumber():-1)}
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;