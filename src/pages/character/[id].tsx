//STATIC SITE GENERATION

import { Layout } from '@/components/layouts/Layout';
import { getCharacter, getCharacters } from '@/service';
import { GetStaticPaths, GetStaticProps,NextPage } from 'next';
import { Character } from '../../types/character';
import { Card } from '@/components/ui/card';

interface Props {
  character: Character;
}

const CharacterPage:NextPage<Props> = ({character}) => {
  return (
    <Layout title='Character'>
        <Card character={character} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  const idiomas = locales as string[];
  const data = await getCharacters();

  const paths =  data.flatMap((character)=> (
    idiomas.map((idioma)=> ({params: {id:character.tail}, locale:idioma}))
  ))

  //Otra opción es hacer un map adentro de un map:
  // const resultado = character.map((character) => {
  //   return idiomas.map((idioma) =>{
  //     return {params: {id:character.tail}, locale:idioma};
  //   });
  // }).flat();

  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const id= params?.id as string;
  const character = await getCharacter(id);

  return {
    props: {
      character
    },
    revalidate: 60 * 60* 24 //24 hs 
    //configuración para un fecthing para actualizar la data según un tiempo que se le pase
  }
}


export default CharacterPage