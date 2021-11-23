import { NextApiRequest, NextApiResponse } from "next";
import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import getConfig from 'next/config'
import { NewData, reformatData } from "./patient-case";
const { serverRuntimeConfig } = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse<NewData | unknown>) => {
  const rawData = await readFile(path.join(serverRuntimeConfig.PROJECT_ROOT, './db/db.json'));
  const data = JSON.parse(rawData.toString());
  if (req.method === 'POST') {
    try {
      const newCase = {
        id: data["patient-cases"].length+1,
        'medical-doctor-id': 68,
        ...req.body
      }
      const newData = {
        ...data,
        'patient-cases': [...data['patient-cases'], newCase]
      }
      await writeFile(path.join(serverRuntimeConfig.PROJECT_ROOT, './db/db.json'), JSON.stringify(newData))
      const reformattedData = reformatData(newData)
      return res.status(200).json(reformattedData);
    } catch(error) {
      return res.status(400).json({error});
    }
  } else {
    return res.status(400).json({error: 'Invalid method'});
  }
}