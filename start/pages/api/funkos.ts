import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Funko } from '../../types/funko';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newFunko: Funko = req.body;
    try {
      const collection_name = process.env.COLLECTION_NAME || 'defaultCollectionName';
      const database_name = process.env.DATABASE_NAME || 'defaultDatabaseName';
      await (await clientPromise).db(database_name).collection(collection_name).insertOne(newFunko);
      res.status(201).send(newFunko);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
