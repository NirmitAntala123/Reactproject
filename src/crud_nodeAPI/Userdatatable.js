import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Userdatatable = (props) => {
  const [data, setState] = useState([]);
  const [currentRowsPerPage, setcurrentRowsPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    setState(props.users);
  }, [props]);

  const changePage = (page) => {
    setcurrentPage(page);
  };

  const rowsPerPage = (rowsPerPage, page) => {
    setcurrentRowsPerPage(rowsPerPage);
    // setcurrentPage(page);
  };
 // const globalSearch = (e) => {
  //   let filtered = props.users.filter(
  //     (user) =>
  //       user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       user.email.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   // set filtered users in state
  //   setState(filtered);
  // };
  const columns = [
    {
      name: "Id",
      selector: (row, index) => ((currentPage - 1) * currentRowsPerPage) + index + 1,
      // selector: (row, index) => index+data.length,
    
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn btn-danger"
            onClick={() => props.deleteUser(row._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-success"
            onClick={() => props.editUser(row, row._id)}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination
        fixedHeader
        highlightOnHover
        responsive
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        onChangePage={changePage}
        onChangeRowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default Userdatatable;
