import { Layout } from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Character } from '../../types/character';
import { Card } from '@/components/ui/card';

const CharacterPage = () => {

    const router = useRouter();
    const [character, setCharacter] = useState<Character>({} as Character)
    const getCharacter = async () => {
        const res = await fetch(`https://www.amiiboapi.com/api/amiibo/?tail=${router.query.id}`)
        const data = await res.json()
        setCharacter(data.amiibo[0])
    }
    useEffect(()=>{
        getCharacter()
    }, []);

  return (
    <Layout title='Character'>
        <Card character={character} />
    </Layout>
  )
}

export default CharacterPage