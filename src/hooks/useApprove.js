import { useCallback } from 'react';
import useEscrow from './useEscrow';
import { useWeb3React } from "@web3-react/core";
import { approve, getEscrowContract } from '../contracts/utils';

const useApprove = (erc20Contract = null, escrowContract = null) => {
 
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
  const escrow = useEscrow();
  if(escrowContract === null)
  escrowContract = getEscrowContract(escrow);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(erc20Contract, escrowContract, account);
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, erc20Contract, escrowContract]);

  return { onApprove: handleApprove };
}

export default useApprove;
