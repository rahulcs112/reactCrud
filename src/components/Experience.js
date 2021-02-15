import React, { useEffect, useState } from "react";

const Experience = (props) => {
  const { formik, setExperienceField, experienceField, setExperience } = props;

  const [fields, setFields] = useState([{ value: "" }]);

  //setExperience
  function handleAdd() {
    const values = [...fields];
    values.push({ value: "" });
    setFields(values);
    props.setExperienceField(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    if (values.length > 1) {
      values.splice(i, 1);
      setFields(values);
      props.setExperienceField(values);
    }
  }

  function handleExperienceChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    props.setExperienceField(values);
  }

  return (
    <React.Fragment>
      {formik.values.experienceField &&
        formik.values.experienceField.map((item, ind) => (
          <div key={ind}>
            <input
              id="experience"
              type="text"
              maxLength="30"
              className="form-control"
              placeholder="experience"
              name={`experienceField[${ind}].value`}
              onChange={(e) => handleExperienceChange(ind, e)}
              onBlur={formik.handleBlur}
              value={formik.values.experienceField[ind].value}
            />
            {formik.touched.experienceField &&
            formik.errors.experienceField &&
            formik.touched.experienceField[ind] &&
            formik.errors.experienceField[ind] &&
            formik.touched.experienceField[ind].value &&
            formik.errors.experienceField[ind].value ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formik.errors.experienceField[ind].value}
              </div>
            ) : null}
            <a
              href
              className="btn btn-link p-0 btn-additional"
              onClick={() => handleRemove(ind)}
              style={{ color: "red" }}
            >
              Remove
            </a>
          </div>
        ))}
      <div className="form-group m-0">
        <a
          href
          className="btn btn-link p-0 btn-additional"
          onClick={() => handleAdd()}
        >
          <i className="fal fa-plus"></i> Add additional Input item
        </a>
      </div>
    </React.Fragment>
  );
};

export default Experience;
