import React, { createContext, useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ESCROW } from '../../contracts';

export const Context = createContext({
  escrow: undefined,
});

const EscrowProvider = ({ children }) => {
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
  
  const  [ethereum, setEthereum] = useState();
  const [escrow, setEscrow] = useState();

  window.escrow = escrow;
  window.eth = ethereum;
 
  useEffect(() => {
      if(library)
        setEthereum(library.provider);
  }, [library]);

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId);
      console.log("chainId = ", chainId);
      const escrowLib = new ESCROW(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setEscrow(escrowLib);
      window.escrowsauce = escrowLib;
    }
  }, [ethereum, library]);

  return <Context.Provider value={{ escrow }}>{children}</Context.Provider>
}

export default EscrowProvider;
