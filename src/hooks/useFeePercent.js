import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import { getFeePercent} from '../contracts/utils'

const useFeePercent = (escrowContract=null) => {
  const [feePercent, setFeePercent] = useState(0);
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
   
    const fetchFeePercent = useCallback(async () => {
      console.log("escrowContract = ", escrowContract);
      const feePercent = await getFeePercent(
        escrowContract
      );
      console.log("feePercent = ", feePercent);
      setFeePercent(feePercent);
    }, [account, escrowContract]);
  

    useEffect(() => {
      if (account && escrowContract) {
        fetchFeePercent();
      }
      let refreshInterval = setInterval(fetchFeePercent, 10000);
      return () => clearInterval(refreshInterval);
    }, [account, escrowContract, fetchFeePercent]);

  return feePercent;
}

export default useFeePercent;
