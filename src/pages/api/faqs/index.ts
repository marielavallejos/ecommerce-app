import faqs from '@/data/faqs';
import { Faq } from '@/types';
import {NextApiRequest, NextApiResponse} from 'next'

type Data = Faq[] | {messege: string}

export default function handler (req:NextApiRequest, res: NextApiResponse) {
//Consultar el body de la peticion, se puede hacer un service para noe star con la data hardcodeada

//Tambien se puede hacer un fecth que creo el backend y que no quede expuesto en el navegador

//Consultar el method de la peticion
if(req.method == 'GET') {
    return res.status(200).json(faqs);
} else {
    return res.status(400).json({message: 'Método no autorizado'});
};

//

};