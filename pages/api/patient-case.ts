import { NextApiRequest, NextApiResponse } from 'next';
import { Data, Doctor, PatientCase, Report } from 'types';
import data from '../../db/db.json';

export type ReformatCase = PatientCase & {doctor: Doctor} & {report: Report[]}

export type NewData =  ReformatCase[]

export const reformatData = (localData: Data) => {
  let result: NewData = [];
  localData['patient-cases'].forEach((patient) => {
    const foundDoctor = localData['medical-doctors'].find(doctor => doctor.id === patient['medical-doctor-id'])
    let foundReports: Report[] = []
    localData.reports.forEach(report => {
      if (report['patient-id'] === patient.id) {
        foundReports.push(report as Report)
      }
    })
    foundReports.sort((a,b) => new Date(a['creation-date']).getTime() - new Date(b['creation-date']).getTime())
    const newPatient = {
      ...patient,
      doctor: foundDoctor as Doctor,
      report: foundReports
    }
    result.push(newPatient)
  });
  return result
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const result = reformatData(data as Data)
  res.status(200).json(JSON.stringify(result))
}
