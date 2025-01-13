import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Funko } from '../../types/funko';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newFunko: Funko = req.body;
    console.log(newFunko);
    try {
      await (await clientPromise).db('funko-showcase').collection('funkos').updateOne({ "_id": new ObjectId(newFunko._id) }, { $set: { imageUrl: newFunko.imageUrl, source: newFunko.source, character: newFunko.character, yearReleased: newFunko.yearReleased, numberInLine: newFunko.numberInLine } });
      res.status(201).send(newFunko);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}