import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Student } from "@/libs/firestore";
import { getAllTeachers } from "@/api/admin";
import { getComparator, stableSort } from "../user/UserTable.utils";
import { Order } from "../user/UserTable.types";

const useTeacherTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Student>("username");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["admin", "teacher", "all"],
    queryFn: getAllTeachers,
  });

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Student
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.map((n) => n.id);
      setSelected(newSelected ?? []);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    // 수정 페이지로 이동시키기
    const student = data?.find((student) => student.id === id);
    navigate("/admin/teacher/edit", { state: student });
  };

  const handleCheckboxClick = (
    event: React.MouseEvent<unknown>,
    id: string
  ) => {
    // 클릭시 선택된 요소를 배열에 추가하는 로직
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - (data === undefined ? 0 : data.length)
        )
      : 0;

  const visibleRows = useMemo(() => {
    if (data === undefined) return [];
    return stableSort(data, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [data, order, orderBy, page, rowsPerPage]);

  return {
    data,
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    isSelected,
    emptyRows,
    visibleRows,
    handleClick,
    handleCheckboxClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  };
};

export default useTeacherTable;
