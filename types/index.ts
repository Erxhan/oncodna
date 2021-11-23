export type Data = {
  "patient-cases": PatientCase[];
  reports: Report[];
  "medical-doctors": Doctor[];
};

export type PatientCase = {
  id: number;
  firstname: string;
  lastname: string;
  country: string;
  sex: "M" | "F";
  "cancer-type": string;
  "medical-doctor-id": number;
  age: number;
};

export type Report = {
  id: number;
  "patient-id": number;
  status: "available" | "unavailable";
  "creation-date": string;
};

export type Doctor = {
  id: number;
  firstname: string;
  lastname: string;
};
