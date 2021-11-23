import { useData } from "@/context/DataProvider";
import {
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { ReformatCase } from "pages/api/patient-case";
import { useMemo, useState } from "react";
import {
  Column,
  Row,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ChevronIcon } from "./Icons";
import Report from "./Report";

const CustomTable = () => {
  const { t, lang } = useTranslation();
  const { data } = useData();
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentCase, setCurrentCase] = useState<ReformatCase | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns: Column<{}>[] = useMemo(
    () => [
      {
        Header: t("common:firstname"),
        accessor: "firstname",
      },
      {
        Header: t("common:lastname"),
        accessor: "lastname",
      },
      {
        Header: t("common:id"),
        accessor: "id",
      },
      {
        Header: t("common:doctor"),
        accessor: "doctor.firstname",
      },
      {
        Header: t("common:reportAvailable"),
        accessor: (row) =>
          `${row?.report?.filter((r) => r.status !== "available").length}` ||
          "0",
      },
      {
        Header: t("common:totalReport"),
        accessor: (row) => `${row?.report?.length}` || "0",
      },
      {
        Header: t("common:creationDate"),
        accessor: (row) =>
          row.report.length
            ? new Date(row.report?.[0]?.["creation-date"])?.toLocaleDateString()
            : "N/A",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  if (!data || !data) {
    return <Spinner />;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
      manualPagination: true,
      initialState: { pageIndex: 0, pageSize: 20 },
      pageCount: numberOfPages,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const selectRow = (row: ReformatCase) => {
    setCurrentCase(row);
    onOpen();
  };

  return (
    <>
      {data.length > 0 && (
        <Table variant="simple" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <HStack>
                        <Text>{column.Header}</Text>
                        {column?.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronIcon width={8} height={8} />
                          ) : (
                            <ChevronIcon
                              transform="rotate(180deg)"
                              width={8}
                              height={8}
                            />
                          )
                        ) : (
                          <ChevronIcon opacity="0" width={8} height={8} />
                        )}
                      </HStack>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: Row<{}>) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  cursor="pointer"
                  onClick={() => selectRow(row?.original as ReformatCase)}
                >
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
      <Report isOpen={isOpen} onClose={onClose} currentCase={currentCase} />
    </>
  );
};

export default CustomTable;
