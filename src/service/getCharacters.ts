import { Character } from "@/types";

export const getCharacters = async () : Promise <Character[]> => {
    const character =await fetch('https://amiiboapi.com/api/amiibo/');
    const res = await character.json();
    const data = res.amiibo.slice(0, 20);
    return data;
}

