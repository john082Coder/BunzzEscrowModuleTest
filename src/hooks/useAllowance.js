import { useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import useEscrow from './useEscrow';
import { useWeb3React } from "@web3-react/core";


import { getEscrowContract, getAllowance } from '../contracts/utils';

const useAllowance = (erc20Contract=null, escrowContract=null) => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account } = useWeb3React();
  const escrow = useEscrow();
  if(escrowContract === null)
    escrowContract = getEscrowContract(escrow);

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      erc20Contract,
      escrowContract,
      account,
    );
    console.log("allowance = ", allowance);
    setAllowance(new BigNumber(allowance));
  }, [account, escrowContract, erc20Contract]);

  useEffect(() => {
    
    if (account && escrowContract && erc20Contract) {
      console.log("erc20Contract = ", erc20Contract)
      fetchAllowance();
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, escrowContract, fetchAllowance, erc20Contract]);
 
  return allowance;
}

export default useAllowance;
