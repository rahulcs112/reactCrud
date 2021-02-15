import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { deleteFormData } from "../services/FormServices";
const List = (props) => {
  let { dataList } = props;
  const { updateList, setUpdatedList, editFormId, setEditFormId } = props;
  dataList = dataList.sort();

  const handleEdit = (id) => {
    setEditFormId(id);
    setUpdatedList(false);
    Swal.fire({
      icon: "success",
      title: "Updating Form Data...",
      text: "please check above form",
      timer: 1000,
      onOpen: function () {
        Swal.showLoading();
      },
    });
  };

  //delete function to delete the user data from list
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        //Once user will click on confirmation
        //then user data will delete from the list
        deleteFormData({ id: id }).then((res) => {
          if (res.data.status == 200 && res.data.data == 1) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User data is deleted from list",
              timer: 1000,
              onOpen: function () {
                Swal.showLoading();
              },
            }).then((result) => {
              props.setUpdatedList(!updateList);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something is going wrong...",
              timer: 3000,
              onOpen: function () {
                Swal.showLoading();
              },
            });
          }
        });
      }
    });
  };

  return (
    <>
      {dataList &&
        dataList.map((element) => {
          return (
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.hobby}</td>
              <td>{element.email}</td>
              <td>
                <img
                  src={element.profileimg}
                  alt="UserProfile"
                  width="40"
                  height="40"
                />
              </td>
              <td>
                <a
                  onClick={() => handleEdit(element.id)}
                  href
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </a>{" "}
                |{" "}
                <a
                  href
                  onClick={() => handleDelete(element.id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Delete
                </a>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default List;
