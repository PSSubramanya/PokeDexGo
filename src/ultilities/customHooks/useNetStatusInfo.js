import {useState, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

export const useNetStatusInfo = () => {
  const netInfo = useNetInfo();
  const [networkState, setNetworkState] = useState(false);

  useEffect(() => {
    setNetworkState(netInfo.isConnected); // NOTE: netInfo.type for getting type of network. Eg. Cellular or Wifi etc.
  }, [netInfo]);

  return {
    networkState,
    setNetworkState,
  };
};
