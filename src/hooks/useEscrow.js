import { useContext } from 'react';
import { Context } from '../contexts/EscrowProvider';

const useEscrow = () => {
  const { escrow } = useContext(Context);
  return escrow;
}

export default useEscrow;