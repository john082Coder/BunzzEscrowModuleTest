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
export const getFeePercent = async (escrowContract) => {
  
  try {
    const feePercent = await escrowContract.methods.feePercent().call();
    console.log("adfsdf = ",feePercent);
  
    return new BigNumber(feePercent);
  } catch {
    console.log("adfsdf = ",330);
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
