import React, { useState, useEffect } from "react";
import List from "./List";
import { getAllFormData } from "../services/FormServices";
import Swal from "sweetalert2";

const DataList = (props) => {
  const { updateList, setUpdatedList, editFormId, setEditFormId } = props;

  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filterData = {
      search_text: searchText,
      limit: limit,
      offset: offset,
    };
    getAllFormData(filterData).then((res) => {
      setDataList(res.data.data);
    });
  }, [searchText, props.updateList]);

  useEffect(() => {
    if (offset) {
      const filterData = {
        search_text: searchText,
        limit: limit,
        offset: offset,
      };
      getAllFormData(filterData).then((res) => {
        if (res.data.data) {
          Swal.fire({
            icon: "success",
            title: "",
            text: "",
            timer: 1000,
            onOpen: function () {
              Swal.showLoading();
            },
          });
          setDataList((dataList) => [...dataList, ...res.data.data]);
        }
      });
    }
  }, [offset]);

  const searchHandler = (e) => {
    let search = e.target.value;
    setInputValue(search);
    setSearchText(search);
  };

  const offsetHandler = () => {
    setOffset(offset + 5);
    console.log(offset);
  };

  const handlerClear = () => {
    Swal.fire({
      icon: "success",
      title: "",
      text: "",
      timer: 1000,
      onOpen: function () {
        Swal.showLoading();
      },
    });
    setInputValue("");
    setSearchText("");
  };

  return (
    <>
      <div className="row" style={{ margin: "50px" }}>
        <div className="col-md-12">
          <input
            className="form-control"
            id="myInput"
            type="text"
            placeholder="Search.."
            style={{
              width: "300px",
              marginLeft: "450px",
              marginRight: "10px",
              display: "initial",
            }}
            onChange={(e) => searchHandler(e)}
            value={inputValue}
          />
          <button
            type="button"
            onClick={() => handlerClear()}
            className="btn btn-warning"
          >
            Clear
          </button>
        </div>

        <br />
        <br />
        <br />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Hobby</th>
              <th>Email</th>
              <th>Picture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <List
              dataList={dataList}
              updateList={updateList}
              setUpdatedList={setUpdatedList}
              editFormId={editFormId}
              setEditFormId={setEditFormId}
            />
          </tbody>
        </table>
        <a
          href
          onClick={() => offsetHandler()}
          style={{ marginLeft: "600px", cursor: "pointer" }}
        >
          Show More
        </a>
      </div>
    </>
  );
};

export default DataList;
