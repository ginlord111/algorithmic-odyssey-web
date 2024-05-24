import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
export async function GET(){

    const username = generateUsername("-");
    return NextResponse.json({value:username})
}