import ToggleMode from "../components/ToggleMode";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import CustomTable from "../components/CustomTable";
import SelectLanguage from "../components/SelectLanguage";
import { NewData } from "./api/patient-case";
import CustomForm from "../components/CustomForm";
import { DataProvider, useData } from "@/context/DataProvider";

const Home = () => {
  return (
    <VStack padding="2rem" width="100%">
      <HStack
        as="header"
        marginBottom="3rem !important"
        justifyContent="space-between"
        width="100%"
      >
        <Text fontWeight="bold" fontSize="2rem">
          OncoDNA
        </Text>
        <HStack align="center">
          <ToggleMode />
          <SelectLanguage />
        </HStack>
      </HStack>
      <CustomForm alignSelf="flex-end" my="2rem !important" />
      <CustomTable />
    </VStack>
  );
};

const HomeWithData = ({ data }: { data: NewData }) => (
  <DataProvider data={data}>
    <Home />
  </DataProvider>
);

export default HomeWithData;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API}/patient-case`);
    const data = await request.json();
    return {
      props: {
        data,
      },
      revalidate: 300,
    };
  } catch (error) {
    return { notFound: true };
  }
};
