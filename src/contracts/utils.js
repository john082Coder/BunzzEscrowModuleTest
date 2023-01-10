import { ethers } from 'ethers';

import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import {
  // SUBTRACT_GAS_LIMIT,
  contractAddresses,
} from './lib/constants.js';
import { bnToDec } from './utils';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});


export const getEscrowContract = (escrow) => {
  return escrow && escrow.contracts && escrow.contracts.escrow;
}

export const getErc20Contract = (escrow) => {
  return escrow && escrow.contracts && escrow.contracts.erc20;
}
export const setErc20ContractAddress = (escrow, address) => {
  escrow.contracts.erc20.options.address = address;
}
export const getAllowance = async (
  erc20Contract,
  escrowContract,
  account
) => {
  try {
    const allowance = await erc20Contract.methods
      .allowance(account, escrowContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getFeePercent = async (escrowContract) => {
  
  try {
    const feePercent = await escrowContract.methods.feePercent().call();
    
  
    return new BigNumber(feePercent);
  } catch {
  
    return new BigNumber(0);
  }

}
export const depositByEth = async (escrowContract, amount, recipientAddress, agentAddress, account) => {
  
    return escrowContract.methods.depositByETH(recipientAddress, agentAddress).send({ from: account, value:new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    });
    
}
export const deposit = async (escrowContract, amount, tokenAddress, recipientAddress, agentAddress, account) => {
  return escrowContract.methods.deposit(tokenAddress, recipientAddress, agentAddress, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() ).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}

export const release = async() => {

} 
