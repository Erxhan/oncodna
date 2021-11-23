import { useData } from "@/context/DataProvider";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { NewData } from "pages/api/patient-case";
import { useForm } from "react-hook-form";
import { PatientCase } from "types";
import { Form } from "./Form/Form";
import Input from "./Form/Input";
import InputSelect from "./Form/InputSelect";

const CustomForm = ({ ...props }: ButtonProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { setLocalData, addCase, getCases } = useData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<Omit<PatientCase, "id">>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = async (formValues: Omit<PatientCase, "id">) => {
    try {
      const newData = (await addCase?.(formValues)) as NewData;
      setLocalData?.(newData);
      toast({
        status: "success",
        title: t("common:success"),
        description: t("common:patientSaved", { name: "Dupont" }),
        isClosable: true,
      });
    } catch (error) {
      toast({
        status: "error",
        title: t("common:somethingWrong"),
        description: t("common:cannotSavePatient"),
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddIcon />} {...props}>
        Add patient case
      </Button>
      <Drawer size="lg" isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a patient case</DrawerHeader>
          <DrawerBody>
            <Form onSubmit={form.handleSubmit(onSubmit)} {...form}>
              <Input
                type="text"
                name="firstname"
                placeholder={t("common:firstname")}
                validation={{
                  required: `${t("common:firstname")} ${t("common:required")}`,
                }}
              />
              <Input
                type="text"
                name="lastname"
                placeholder={t("common:lastname")}
                validation={{
                  required: `${t("common:lastname")} ${t("common:required")}`,
                }}
              />
              <Input
                type="text"
                name="country"
                placeholder={t("common:country")}
                validation={{
                  required: `${t("common:country")} ${t("common:required")}`,
                }}
              />
              <InputSelect name="sex">
                <option key="M" value="M">
                  {t("common:male")}
                </option>
                <option key="F" value="F">
                  {t("common:female")}
                </option>
              </InputSelect>
              <Input
                type="text"
                name="cancerType"
                placeholder={t("common:cancerType")}
                validation={{
                  required: `${t("common:cancerType")} ${t("common:required")}`,
                }}
              />
              <Input
                type="number"
                name="age"
                placeholder={t("common:age")}
                validation={{
                  required: `${t("common:age")} ${t("common:required")}`,
                }}
              />
              <Button type="submit">Save</Button>
            </Form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomForm;
