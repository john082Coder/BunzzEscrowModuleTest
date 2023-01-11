import { Button, Col, Container, Row, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import useFeePercent from "../hooks/useFeePercent";
import useAllowance from '../hooks/useAllowance';
import useApprove from '../hooks/useApprove';
import useEscrow from '../hooks/useEscrow';
import { bnToDec, isAddress } from '../utils';
import {getEscrowContract, depositByEth, getErc20Contract,setErc20ContractAddress,deposit, cancel, approveCancel } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";
import BigNumber from 'bignumber.js';
import usePools from '../hooks/usePools';
const Creator = () => {
    const escrow = useEscrow();
    const { account} = useWeb3React();
    const escrowContract = getEscrowContract(escrow);
    const [depositAmount, setDepositAmount] = useState(0);
    const [recipientAddress, setRecipientAddress] = useState("0x02Ed95beA37d4158B5dd3F496BAe6A85Ab2090f3");
    const [agentAddress, setAgentAddress] = useState("0x708aee3E6540239CfbE34811D2d542D72de8bd76");
    const [tokenAddress, setTokenAddress ] = useState("");
    const feePercent = (useFeePercent(escrowContract));
    const erc20Contract = getErc20Contract(escrow);
    const allowance = bnToDec(useAllowance(erc20Contract, escrowContract));
    const { onApprove } = useApprove(erc20Contract, escrowContract);
    const {pools, poolCount} = usePools(escrowContract);
   

    useEffect(() => {
        if(isAddress(tokenAddress))
            setErc20ContractAddress(escrow, tokenAddress);
      }, [account, escrowContract, tokenAddress]);
   
      console.log("allowance = ", allowance);
    const handleApprove = useCallback(async () => {
        try { 
            const txHash = await onApprove();
            if (!txHash) {
            }
        } catch (e) {
            console.log(e);
        }
    }, [onApprove]);
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Amount</Form.Label>
                            <Form.Control type="email" placeholder="Enter Value" value={depositAmount} onChange={(val) => setDepositAmount(val.target.value)} />

                            <Form.Label>Input Token Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={tokenAddress} onChange={(val) => setTokenAddress(val.target.value)} />

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
                        {allowance?(
                            <>
                             <Button className="mx-3" variant="dark"  onClick={async () => {
                                try {
                                    let txHash;
                                    
                                    txHash = await deposit(
                                        escrowContract,
                                        depositAmount,
                                        tokenAddress,
                                        recipientAddress,
                                        agentAddress,
                                        account,
                                        erc20Contract
                                    );
                                
                                    console.log(txHash);
                                    
                                } catch (e) {
                                    console.log(e);
                                    
                                }
                            }} >
                            DepositToken
                            </Button>
                            </>
                        ):(
                            <>
                             <Button className="mx-3" variant="dark"  disabled >DepositToken</Button>
                             
                             <Button variant="dark" className="mt-3" onClick={handleApprove} >Approve Token</Button>
                            </>
                        )}
                       <div></div>
                       {pools.map((pool, key) => (
                                <>
                                    <Form.Label>Pool {key}</Form.Label>
                                    <div>token:{pool?.token}</div>
                                    <div>sender:{pool?.sender}</div>
                                    <div>recipient:{pool?.recipient}</div>
                                    <div>agent:{pool?.agent}</div>
                                     <Button className="mx-3" variant="dark" onClick={async () => {
                                        try {
                                            let txHash;
                                            
                                            txHash = await approveCancel(
                                                escrowContract,
                                                key,
                                                account,
                                            );
                                        
                                            console.log(txHash);
                                            
                                        } catch (e) {
                                            console.log(e);
                                            
                                        }
                                     }}>Approve Cancel
                                    </Button>
                                    <Button variant="dark" onClick={async () => {
                                        try {
                                            let txHash;
                                            
                                            txHash = await cancel(
                                                escrowContract,
                                                key,
                                                account,
                                            );
                                        
                                            console.log(txHash);
                                            
                                        } catch (e) {
                                            console.log(e);
                                            
                                        }
                                     }}> Cancel
                                    </Button>
                                     <div></div>
                                </>
                            ))
                            }
                    </Form>
                    {(feePercent?feePercent.toNumber():-1)}

                  
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;