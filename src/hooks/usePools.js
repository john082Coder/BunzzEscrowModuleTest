
import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import useEscrow from './useEscrow';
import { getPools,getPoolsCount,getEscrowContract, getFeePercent } from '../contracts/utils';

const usePools = (escrowContract=null) => {
 
  const [pools, setPools] = useState([]);
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
      
      const poolCount = await getPoolsCount(escrowContract);
      console.log("poolCount = ", poolCount)
      let  pp  = new Array();
      for(var i = 0;i<poolCount;i++)
      {
      
        const pool = await getPools(
          escrowContract,i
        );
       
        pp.push(pool);

      }
      setPools(pp)
      console.log("pools = ", pools);

      
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