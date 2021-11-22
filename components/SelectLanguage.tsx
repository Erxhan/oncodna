import { Select, SelectProps, StackProps } from "@chakra-ui/react";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

const SelectLanguage = ({ ...props }: SelectProps) => {
  const { lang } = useTranslation();

  return (
    <Select
      onChange={async (e) => await setLanguage(e.target.value)}
      maxWidth="5rem"
      value={lang}
      fontWeight="bold"
      {...props}
    >
      <option value="fr">FR</option>
      <option value="nl">NL</option>
      <option value="en">EN</option>
    </Select>
  );
};

export default SelectLanguage;
