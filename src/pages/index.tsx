import styles from '@/styles/Home.module.css'
import { Character } from '@/types'
import { GetStaticProps, NextPage } from 'next'
import { Card } from '@/components/ui/card'
import { Layout } from '@/components/layouts/Layout'
interface Props{
  characters: Character[]
}

const Home:NextPage<Props> = ({characters}) => {

  // const [characters, setCharacters] = useState<Character[]>([])

  // const getCharacter = async () => {
  //   const character =await fetch('https://amiiboapi.com/api/amiibo/')
  //   const rest = await character.json()
  //   const data = rest.amiibo.slice(0, 10)
  //   setCharacters(data);
  // }

  // useEffect(() => {
  //   getCharacter()

  // }, [])

  //En vez de esto, usamos get static props para hacerlo del lado del servidor

  return (
    <Layout title='Home'>
        <h1>Ecommerce App</h1>
        <div className={styles.grid}>
          {characters.map((character) => (
            <Card key={character.tail} character={character} />
          ))}
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const character =await fetch('https://amiiboapi.com/api/amiibo/')
  const res = await character.json()
  const data = res.amiibo.slice(0, 20)

    return {
      props:{
        characters: data,
      },
    }
}

export default Home
