import { generateUsername } from "unique-username-generator";
export function randomUsername(){
    const username = generateUsername("-");
    return username
}