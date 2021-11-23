import { NewData } from "pages/api/patient-case";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PatientCase } from "types";

type DataProviderProps = {
  data: NewData;
};

type DataProviderContextType = {
  data: NewData;
  setLocalData?: Dispatch<SetStateAction<NewData>>;
  getCases?: () => void;
  addCase?: (data: Omit<PatientCase, "id">) => Promise<NewData>;
};

export const DataContext = createContext<DataProviderContextType>({
  data: [],
});

export const DataProvider: FC<DataProviderProps> = ({ children, data }) => {
  const [localData, setLocalData] = useState<NewData>(data);

  const getCases = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API}/patient-case`
      );
      const data = await request.json();
      setLocalData(data);
    } catch (error) {
      throw new Error(`{error}`);
    }
  };

  const addCase = async (data: Omit<PatientCase, "id">) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/add-case`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  return (
    <DataContext.Provider
      value={{ data: localData, setLocalData, addCase, getCases }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
