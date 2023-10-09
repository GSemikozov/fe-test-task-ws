import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import type { Leader } from "@/types";

const WS_URL = 'ws://localhost:3050';

export const useLeaders = (dataLength: number) => {
    const [data, setData] = useState<Leader[]>([]);
    const [hiddenLeaders, setHiddenLeaders] = useState<string[]>([]);

    const addLeaderToHiddenList = useCallback((userId: string) => {
        setHiddenLeaders((prevState) => {
            const newData = new Set([...prevState, userId]);
            return [...newData];
        });
    }, []);

    const handleWebsocketData = useCallback((obtainedData: Leader) => {
        setData((data) => {
            return [...data, obtainedData]
                .sort((a: Leader, b: Leader) => b.score - a.score)
                .slice(0, dataLength);
        });
    }, [dataLength]);

    useEffect(() => {
        setData((data) => {
            return data.filter(leader => hiddenLeaders.indexOf(leader.userId) === -1)
        });
    }, [hiddenLeaders]);

    useEffect(() => {
        try {
            const socketConnection = io(WS_URL);
            socketConnection.on('userData', handleWebsocketData);
            return () => socketConnection.close();
        } catch (e) {
            // TODO: add toast
            console.error(e);
        }

        return () => {};
    }, [handleWebsocketData]);

    return {
        data,
        hiddenLeaders,
        addLeaderToHiddenList,
    };
}
