import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useToast } from '@/components/ui/use-toast';

import type { Leader } from '@/types';
import { capitalizeSentence } from '@/lib/utils';

const WS_URL = 'ws://localhost:3050';

export const useLeaders = () => {
  const [data, setData] = useState<Leader[]>([]);
  const [hiddenLeaders, setHiddenLeaders] = useState<string[]>([]);
  const { toast } = useToast();
  const toastRef = useRef<ReturnType<typeof toast> | null>(null);

  const addLeaderToHiddenList = useCallback((userId: string) => {
    setHiddenLeaders((prevState) => {
      const newData = new Set([...prevState, userId]);
      return [...newData];
    });
  }, []);

  const handleWebsocketData = useCallback((obtainedData: Leader) => {
    setData((data) => {
      return [...data, obtainedData].sort((a: Leader, b: Leader) => b.score - a.score);
    });
  }, []);

  const handleWebsocketErrors = useCallback(
    (err: Error | string) => {
      const message = typeof err === 'string' ? err : err.message;

      if (toastRef.current) {
        return;
      }

      toastRef.current = toast({
        duration: Infinity,
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with your request. ${capitalizeSentence(message)}`,
      });
    },
    [toast]
  );

  const clearToast = () => {
    toastRef.current?.dismiss();
    toastRef.current = null;
  };

  useEffect(() => {
    setData((data) => {
      return data.filter((leader) => hiddenLeaders.indexOf(leader.userId) === -1);
    });
  }, [hiddenLeaders]);

  useEffect(() => {
    const socketConnection = io(WS_URL);

    socketConnection.on('connect', clearToast);
    socketConnection.on('userData', handleWebsocketData);
    socketConnection.on('connect_error', handleWebsocketErrors);
    socketConnection.on('connect_failed', handleWebsocketErrors);
    socketConnection.on('disconnect', handleWebsocketErrors);

    return () => {
      socketConnection.close();
    };
  }, [handleWebsocketData, handleWebsocketErrors]);

  return {
    data,
    hiddenLeaders,
    addLeaderToHiddenList,
  };
};
