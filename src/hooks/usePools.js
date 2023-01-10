
import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import useEscrow from './useEscrow';
import { getPools,getPoolsCount,getEscrowContract, getFeePercent } from '../contracts/utils';

const usePools = (escrowContract=null) => {
 
  const [pools, setPools] = useState(0);
  const [poolCount, setPoolCount] = useState(0);
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

    const fetchPools = useCallback(async () => {
      console.log("escrowContract = ", escrowContract);
      const pools = await getPools(
        escrowContract
      );
      const poolCount = await getPoolsCount(escrowContract);
      console.log("pools = ", pools);

      setPools(pools);
      setPoolCount(poolCount);
    }, [account, escrowContract]);
  

    useEffect(() => {
      if (account && escrowContract) {
        fetchPools();
      }
      let refreshInterval = setInterval(fetchPools, 10000);
      return () => clearInterval(refreshInterval);
    }, [account, escrowContract, fetchPools]);
  return {pools, poolCount};
}

export default usePools;