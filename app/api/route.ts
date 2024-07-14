import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET () {
    try{
    
    return NextResponse.json(Math.random())

    }
    catch(err){
        return NextResponse.json(err,{ status : 500})
    }
}