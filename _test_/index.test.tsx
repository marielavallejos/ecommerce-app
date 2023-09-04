import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import { useRouter } from 'next/router';
import { Character } from '../src/types/character';
import Home, { getStaticProps } from "@/pages";
import { getCharacters } from "@/service";

//Mock useRouter
//Decirle que queremos que devuelva
jest.mock("next/router", () => ({
    useRouter: () => ({
        locale: "es-ES",
        asPath:"/",
    })
}));

//Mock del servicio de getCharacters
//Decirle que queremos que devuelva
jest.mock("../src/service/index.ts", () => ({
    getCharacters: jest.fn()
}));

// Mock de Next.js Image
function MockImg(props: any) {
    const { priority, ...otherProps } = props
    return React.createElement('img', {...otherProps, priority: priority ? "true" : undefined})
}
jest.mock('next/image', () => MockImg)


//TESTS
describe("Home", () => {

    it("Should render Heading", () => {
        render(<Home characters={[]}/>);
        const heading = screen.getByText("¡Bienvenido a la tienda!");
        screen.debug();
    })

    it("Should render a list of characters", async () => {
        //Necesitamos que el home reciba data
        const characters = [
            {
                tail: "1",
                name: "Mario",
                image: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00340102.png",
                amiiboSeries: "Super Smash Bros.",
                character: "Mario",
                gameSeries: "Super Mario",
                head: "00000000",
                release: {
                  au: "2014-11-29",
                  eu: "2014-11-28",
                  jp: "2014-12-06",
                  na: "2014-11-21",
                },
                type: "Figure",
        
        
              },
              {
                tail: "2",
                name: "Luigi",
                image: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png",
                amiiboSeries: "Super Smash Bros.",
                character: "Luigi",
                gameSeries: "Super Mario",
                head: "00010000",
                release: {
                  au: "2014-11-29",
                  eu: "2014-11-28",
                  jp: "2014-12-06",
                  na: "2014-11-21",
                },
                type: "Figure",
              },

        ];

        (getCharacters as jest.Mock).mockResolvedValue(characters);
        //la funcion se ejecuta y se resuelva con ese valor, character

        const {props} = await getStaticProps();

        render (<Home characters={props.characters} />);

        screen.debug();
    })

})

