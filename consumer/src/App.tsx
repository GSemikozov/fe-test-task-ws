import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaderBoard } from "@/components/leaderboard";
import { Settings } from "@/components/settings";
import { useState } from "react";
import { useLeaders } from "@/hooks";

enum AppTabs {
    leaderboard = 'leaderboard',
    settings = 'settings'
}

export const MIN_LEADERBOARD_DATA_LENGTH = 1;
export const MAX_LEADERBOARD_DATA_LENGTH = 20;
export const DEFAULT_LEADERBOARD_DATA_LENGTH = 10;

function App() {
    const [leaderBoardLength, setLeaderBoardLength] = useState(DEFAULT_LEADERBOARD_DATA_LENGTH);
    const { data, addLeaderToHiddenList } = useLeaders(leaderBoardLength);

    return (
        <Tabs defaultValue={AppTabs.leaderboard}>
            <TabsList>
                <TabsTrigger value={AppTabs.leaderboard}>{AppTabs.leaderboard}</TabsTrigger>
                <TabsTrigger value={AppTabs.settings}>{AppTabs.settings}</TabsTrigger>
            </TabsList>
            <TabsContent value={AppTabs.leaderboard}>
                <LeaderBoard data={data} onRemoveLeader={addLeaderToHiddenList} />
            </TabsContent>
            <TabsContent value={AppTabs.settings}>
                <Settings
                    value={leaderBoardLength}
                    onChange={setLeaderBoardLength}
                    minDataLength={MIN_LEADERBOARD_DATA_LENGTH}
                    maxDataLength={MAX_LEADERBOARD_DATA_LENGTH}
                />
            </TabsContent>
        </Tabs>
    )
}

export default App