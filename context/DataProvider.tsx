import { NewData } from "pages/api/patient-case";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DataProviderProps = {
  data: NewData;
};

type DataProviderContextType = {
  data: NewData;
  setLocalData?: Dispatch<SetStateAction<NewData>>;
};

export const DataContext = createContext<DataProviderContextType>({
  data: [],
});

export const DataProvider: FC<DataProviderProps> = ({ children, data }) => {
  const [localData, setLocalData] = useState<NewData>(data);

  return (
    <DataContext.Provider value={{ data: localData, setLocalData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
