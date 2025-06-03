import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react';
import React from 'react';
import type { Layer } from 'y/types';
import { undefined } from 'zod';

"use client"
export function Room({ children, roomId }: { children: React.ReactNode, roomId: string }) {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider  id = {roomId} initialPresence= {{
                selection: [],
                cursor: null,
                penColor: null,
                pencilDraft: null
            }} initialStorage={{
                roomColor: {r: 30, g: 30, b: 30}, // Default white color
                layers: new LiveMap<string, LiveObject<Layer>>(), 
                layerIds: new LiveList([]), // Initialize with an empty list

            }}
            >
                <p> 

                </p>
                {children}
            </RoomProvider>
        </LiveblocksProvider>
    );
}