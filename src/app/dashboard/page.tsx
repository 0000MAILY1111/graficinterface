"use client"
import { signout } from "../actions/authactions"

	///esta es la pagina del dashboard 

export default function Page () {
    return (
        <>
        <div>
            <p> My dashboard </p>
            <button onClick = {()=> signout ()}>Sign out</button>
        </div>
        </>
    )
}