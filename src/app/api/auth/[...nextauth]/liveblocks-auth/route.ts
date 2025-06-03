import {Liveblocks} from "@liveblocks/node"; 
import { auth } from "y/server/auth";
import { db } from "y/server/db";
import { id } from "zod/v4/locales";
 
const liveblocks = new Liveblocks ({secret : "hello"});
export async function POST (req: Request) {
    const usserSession = await auth();

    const user = await db.user.findUnique({
        where: {id: usserSession?.user.id}
    })
    const session = liveblocks.prepareSession (user.id, {
        userInfo: {
            name: user.email ?? "Anonymous"
        }
    });
    session.allow (`room: ${"testing"}`, session.FULL_ACCESS);
    const {status , body} = await session.authorize()

    return new Response(body, {status})
}
