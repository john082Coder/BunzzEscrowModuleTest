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
export const getDecimal = async (
  erc20Contract,
) => {
  try {
    const decimal = await erc20Contract.methods
      .decimals()
      .call()
      return new BigNumber(decimal);
  } catch (e) {
    return new BigNumber(0);
  }
}

export const getFeePercent = async (escrowContract) => {
  
  try {
    const feePercent = await escrowContract.methods.feePercent().call();
    
  
    return new BigNumber(feePercent);
  } catch {
    console.log("error");
    return new BigNumber(0);
  }

}
export const getPoolsCount = async(escrowContract) => {
  
  try {
    const poolCount = await escrowContract.methods.poolCount().call();
 //   console.log("asdfdsf = ", poolCount)
  
    return poolCount;
  } catch {
    console.log("asdfdsf = 22")
    return 0;
  } 

}
export const depositByEth = async (escrowContract, amount, recipientAddress, agentAddress, account) => {
 
    return escrowContract.methods.depositByETH(recipientAddress, agentAddress).send({ from: account, value:new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    });
    
}
export const deposit = async (escrowContract, amount, tokenAddress, recipientAddress, agentAddress, account, erc20Contract) => {
  
  const decimal =await erc20Contract.methods.decimals().call();
  console.log("decimal = ", decimal);
  return escrowContract.methods.deposit(tokenAddress, recipientAddress, agentAddress, new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString() ).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}

export const release = async(escrowContract, poolId, account) => {
  return escrowContract.methods.release(poolId).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });

} 
export const approveCancel = async(escrowContract, poolId, account) => {
  return escrowContract.methods.approveCancel(poolId).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}
export const cancel = async(escrowContract, poolId, account) => {
  return escrowContract.methods.cancel(poolId).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}
export const approve = async(erc20Contract, escrowContract, account) => {
  return erc20Contract.methods
  .approve(escrowContract.options.address, ethers.constants.MaxUint256)
  .send({ from: account });
}
export const getPools = async(escrowContract,poolId=0) => {
  try {
    const pool = await escrowContract.methods.pools(poolId).call();
    
  
    return pool;
  } catch {
  
    return null;
  } 
}
