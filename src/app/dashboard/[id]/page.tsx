
///esta es la pagina del id del dashboard 
"use client";
import { Room } from "y/components/liveblocks/Room";
import { auth } from "y/server/auth";

type ParamsType = Promise <{ id: string}>

export default async function Page ({ params }: { params: ParamsType }) {
    const {id} = await params;
    const session = await auth ();
    return (
        <>
        <Room roomId={"room:" + id}>
            <p>Hello</p>
            {/* aqui va el camvas */}
        </Room>
         
        </>
       
    )

}