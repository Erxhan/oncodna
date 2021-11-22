import { NextApiRequest, NextApiResponse } from 'next';
import { Doctor, PatientCase, Report } from 'types';
import data from '../../db/db.json';

export type ReformatCase = PatientCase & {doctor: Doctor} & {report: Report[]}

export type NewData =  ReformatCase[]

export default (req: NextApiRequest, res: NextApiResponse) => {
  let result: any[] = [];
  data['patient-cases'].forEach((patient) => {
    const foundDoctor = data['medical-doctors'].find(doctor => doctor.id === patient['medical-doctor-id'])
    let foundReports: Report[] = []
    data.reports.forEach(report => {
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
  res.status(200).json(JSON.stringify(result))
}
