import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { ReformatCase } from "pages/api/patient-case";

type ReportProps = {
  currentCase: ReformatCase | null;
  isOpen: boolean;
  onClose: () => void;
};

const Report = ({ currentCase, isOpen, onClose }: ReportProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2rem">{t("common:reports")}</ModalHeader>
        <ModalBody paddingY="2rem">
          {currentCase?.report?.length ? (
            currentCase?.report?.map((r) => {
              return (
                <VStack align="baseline" marginBottom="2rem">
                  <HStack>
                    <Text fontWeight="bold">ID:</Text>
                    <Text>{r.id}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">{t("common:id")}:</Text>
                    <Text>{r["patient-id"]}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Status:</Text>
                    <Text>{t(`common:${r.status}`)}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Date:</Text>
                    <Text>
                      {new Date(r["creation-date"]).toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              );
            })
          ) : (
            <Text fontWeight="bold">No report</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Report;
