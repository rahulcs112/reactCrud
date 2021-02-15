import logo from "./logo.svg";
import "./App.css";
import DataList from "./components/DataList";
import AddDataForm from "./components/AddDataForm";
import EditDataForm from "./components/EditDataForm";

import React, { useState, useEffect } from "react";
function App() {
  const [editFormId, setEditFormId] = useState(0);
  const [formView, setFormView] = useState(true);
  const [updateList, setUpdatedList] = useState(true);
  return (
    // <div className="App">
    <React.Fragment>
      <div className="container">
        {formView && !editFormId ? (
          <AddDataForm
            updateList={updateList}
            setUpdatedList={setUpdatedList}
            formView={formView}
            setFormView={setFormView}
          />
        ) : (
          <EditDataForm
            updateList={updateList}
            setUpdatedList={setUpdatedList}
            editFormId={editFormId}
            setEditFormId={setEditFormId}
            formView={formView}
            setFormView={setFormView}
          />
        )}
      </div>
      <DataList
        updateList={updateList}
        setUpdatedList={setUpdatedList}
        editFormId={editFormId}
        setEditFormId={setEditFormId}
        formView={formView}
        setFormView={setFormView}
      />
    </React.Fragment>
    // </div>
  );
}

export default App;
