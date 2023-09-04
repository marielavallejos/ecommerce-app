import faqs from '@/data/faqs';
import handler from '@/pages/api/faqs';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';


describe('Test en Faqs Api', () => {
    test('Debería retornar los datos correctos y su status', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
        method: 'GET',
    })
    const res= httpMocks.createResponse<NextApiResponse>();

    // importacion del handler de faqs !!Importante
    await handler(req, res)

    const data = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data).toEqual(faqs);
    })

    test('Debería retornar un error 400', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
        method: 'POST',
    })
    const res= httpMocks.createResponse<NextApiResponse>();
    
    // importacion del handler de faqs !!Importante
    await handler(req, res)
    
    const data = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(data).toEqual({message: 'Método no autorizado'});
    
    })
})