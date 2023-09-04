import { USERS } from '@/data/user'
import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse){

   //Validación: que reciba el request en el body
    const {email, password} = req.body

    //Validamción: si el usuario existe en la BD
     const user = USERS.find((user) => user.email === email && user.password === password)

     if(!user) {
        res.status(404).json({message: 'Usuario no existe'})
     }
     //setear una cookie que es lo que mira el middleware
     //access=true => como se llama la cookie
     //path=/ => la ruta en la que la cookie es válida, en este caso todo el sitio porq es la ruta raiz
     //semesite=lax => atributo que controla como se envía la cookie, lax nav segura y principales
     // httponly => atributo que impide que JS acceda a la cookie
     res.setHeader('set-cookie', 'access=true; path=/; semesite=lax; httponly')
     res.status(200).json({message: 'Usuario logueado con éxito'})

}







