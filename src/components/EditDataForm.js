import React, { useState, useEffect, useRef } from "react";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ExperienceEdit from "./ExperienceEdit";
import { editFormData, getSingleData } from "../services/FormServices";

const EditDataForm = (props) => {
  const { editFormId, setEditFormId } = props;

  //Creating a refrence of checkbox
  const hobby1 = useRef();
  const hobby2 = useRef();
  const hobby3 = useRef();

  //Refrence of radio button
  const gender1 = useRef();
  const gender2 = useRef();

  useEffect(() => {
    if (props.editFormId > 0) {
      getSingleData({ id: props.editFormId }).then((res) => {
        console.log(res);
        const {
          name,
          email,
          hobby,
          profileimg,
          phone,
          gender,
          education,
          experience,
          message,
        } = res.data.data;

        setFormName(name);
        setFormEmail(email);
        setFormPhone(phone);
        setFormMessage(message);
        setImagePath(profileimg);

        setGenderField(gender);

        let exp = experience.split(",");

        let expArr = [];
        exp.forEach((element) => {
          expArr.push({ value: element });
        });

        setExperienceField(expArr);

        let hobbyArr = hobby.split(",");

        let hobbyList = [];

        hobbyArr.forEach((element) => {
          let ele = element.trim();

          if (ele == "travelling") {
            hobby3.current.checked = true;
            hobbyList.push("travelling");
          }

          if (ele == "singing") {
            hobby2.current.checked = true;
            hobbyList.push("singing");
          }
          if (ele == "cricket") {
            hobby1.current.checked = true;
            hobbyList.push("cricket");
          }
        });
        setUserHobby(hobbyList.toString());

        if (education == "BE" || education == "MTECH") {
          setFormEducation(education);
        }
        setFileExist(true);
        setSelectedHobby(true);
      });
    }
  }, [editFormId]);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEducation, setFormEducation] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [fileExist, setFileExist] = useState(false);

  const [experienceField, setExperienceField] = useState([{ value: "" }]);
  const [selectedHobby, setSelectedHobby] = useState(false);
  const [userHobby, setUserHobby] = useState("");
  const [hobby, setHobby] = "";
  const [genderField, setGenderField] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [experience, setExperience] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [genderChecked1, setGenderChecked1] = useState(true);
  const [genderChecked2, setGenderChecked2] = useState(false);

  //Adding selected file to existing file
  const getSelectedFile = (e) => {
    let newFile = Object.values(e.target.files);
    setSelectedFile((files) => [...files, ...newFile]);
    setFileExist(true);
  };

  //Deleting file
  const deleteSelectedFile = (index) => {
    const arr = selectedFile;
    arr.splice(index, 1);
    setSelectedFile(arr);
    console.log(arr.length);
    if (arr.length === 0) setFileExist(false);
  };

  //Used useState to set the form value so that data will not be erase on form reinitialization
  const handleEducation = (e) => {
    setFormEducation(e.target.value);
  };

  const handleMessage = (e) => {
    setFormMessage(e.target.value);
  };

  const handleName = (e) => {
    setFormName(e.target.value);
  };

  const handleEmail = (e) => {
    setFormEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setFormPhone(e.target.value);
  };

  const handleHobby = () => {
    let hobbyList = [];
    if (
      hobby1.current.checked ||
      hobby2.current.checked ||
      hobby3.current.checked
    ) {
      if (hobby1.current.checked) {
        hobbyList.push("cricket");
      }
      if (hobby2.current.checked) {
        hobbyList.push("singing");
      }
      if (hobby3.current.checked) {
        hobbyList.push("travelling");
      }
      //console.log(hobbyList);
      setUserHobby(hobbyList.toString());
      setSelectedHobby(true);
    } else {
      setSelectedHobby(false);
    }
  };

  const handleGender = () => {
    console.log(gender1.current.checked);
    if (gender1.current.checked || gender2.current.checked) {
      if (gender1.current.checked) {
        setGenderField("Male");
        setGenderChecked1(true);
      }

      if (gender2.current.checked) {
        setGenderField("Female");
        setGenderChecked2(true);
      }
    }
  };

  //Regex for phone number as well as name
  const phoneRegExp = /^[6-9]\d{9}$/;
  const nameRegExp = /^[a-zA-Z]+$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: props.editFormId,
      name: formName,
      email: formEmail,
      phone: formPhone,
      education: formEducation,
      experienceField: experienceField,
      message: formMessage,
      interestField: selectedHobby,
      hobby: userHobby,
      profileimg: selectedFile,
      experience: experience,
      fileExist: fileExist,
      gender: genderField,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(nameRegExp, "Name should be in A-Z/a-z")
        .required("Name Required"),
      message: Yup.string().required("Required"),
      interestField: Yup.boolean().oneOf([true], "Select at least one hobby"),
      experienceField: Yup.array()
        .of(
          Yup.object().shape({
            value: Yup.string().required("Required"), // these constraints take precedence
          })
        )
        .required("Must have friends"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number should be 0-9 of 10 digite")
        .required("Email Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      education: Yup.string().required("Required"),
      fileExist: Yup.bool().oneOf([true], "Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.profileimg.length > 0) {
        const formInputs = new FormData();
        selectedFile.map((item, index) => {
          formInputs.append(`profileimg`, item);
        });
        Object.keys(values).map((item) => {
          formInputs.append(item, values[item]);
        });

        let myExp = [];
        Object.values(values.experienceField).map((item) => {
          myExp.push(item.value);
        });
        formInputs.append(`experience`, myExp.toString());
        editFormData(formInputs).then((res) => {
          if (res.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User details Updated in to user list successfully",
              timer: 1000,
              onOpen: function () {
                Swal.showLoading();
              },
            }).then(function (result) {
              if (result) {
                resetForm();
                props.setFormView(true);
                props.setEditFormId(0);
                props.setUpdatedList(!props.updateList);
              }
            });
          }
        });
      } else {
        let myExp = [];
        Object.values(values.experienceField).map((item) => {
          myExp.push(item.value);
        });

        values.experience = myExp.toString();

        editFormData(values)
          .then((res) => {
            if (res.status == 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "User details updated successfully",
                timer: 3000,
                onOpen: function () {
                  Swal.showLoading();
                },
              }).then(function (result) {
                if (result) {
                  resetForm();

                  props.setFormView(true);
                  props.setEditFormId(0);
                  props.setUpdatedList(!props.updateList);
                }
              });
            }
          })
          .catch((errors) => {
            Swal.fire({
              icon: "Error",
              title: "Error",
              text: errors,
              timer: 3000,
              onOpen: function () {
                Swal.showLoading();
              },
            });
          });
      }
    },
  });

  return (
    <>
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h1>Edit User Form</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>
                  Name<span>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.name && formik.touched.name
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="New Task"
                  name="name"
                  onChange={(e) => handleName(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Email<span>*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.email && formik.touched.email
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleEmail(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Phone<span>*</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.phone && formik.touched.phone
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="phone"
                  name="phone"
                  onChange={(e) => handlePhone(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Gender<span style={{ "margin-right": "10px" }}>*</span>
                </label>
                <br />
                Male
                <input
                  id="male"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  checked={genderField == "Male"}
                  style={{ margin: "5px" }}
                />
                Female
                <input
                  id="female"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  style={{ margin: "5px" }}
                  checked={genderField == "Female"}
                />
              </div>

              <div className="form-group">
                <label>
                  Education<span style={{ "margin-right": "10px" }}>*</span>
                </label>
                <select
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.education && formik.touched.education
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="Education"
                  name="education"
                  onChange={(e) => handleEducation(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.education}
                >
                  <option value="">----</option>
                  <option value="BE">BE</option>
                  <option value="MTECH">MTECH</option>
                </select>

                {formik.touched.education && formik.errors.education ? (
                  <div className="invalid-feedback">
                    {formik.errors.education}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Hobby<span style={{ "margin-right": "10px" }}>*</span>
                </label>
                <br />
                Cricket
                <input
                  id="cricket"
                  type="checkbox"
                  maxLength="50"
                  className=""
                  placeholder="cricket"
                  name="interestField"
                  onChange={() => handleHobby()}
                  onBlur={formik.handleBlur}
                  value={formik.values.interestField}
                  style={{ margin: "5px" }}
                  ref={hobby1}
                />
                Singing
                <input
                  id="singing"
                  type="checkbox"
                  maxLength="50"
                  className=""
                  placeholder="singing"
                  name="interestField"
                  onChange={() => handleHobby()}
                  onBlur={formik.handleBlur}
                  value={formik.values.interestField}
                  style={{ margin: "5px" }}
                  ref={hobby2}
                />
                Travelling
                <input
                  id="travelling"
                  type="checkbox"
                  maxLength="50"
                  className=""
                  placeholder="travelling"
                  name="interestField"
                  onChange={() => handleHobby()}
                  onBlur={formik.handleBlur}
                  value={formik.values.interestField}
                  style={{ margin: "5px" }}
                  ref={hobby3}
                />
                {formik.touched.interestField && formik.errors.interestField ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {formik.errors.interestField}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Experience<span>*</span>
                </label>
                <ExperienceEdit
                  formik={formik}
                  experienceField={experienceField}
                  setExperienceField={setExperienceField}
                  setExperience={setExperience}
                  editFormId={editFormId}
                />

                {formik.touched.experience && formik.errors.experience ? (
                  <div className="invalid-feedback">
                    {formik.errors.experience}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  profileimg<span>*</span>
                </label>

                <input
                  type="file"
                  id="input"
                  multiple
                  className="form-control  form-control-aatch-file"
                  name="file[]"
                  onChange={getSelectedFile}
                />

                {formik.touched.fileExist && formik.errors.fileExist ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {formik.errors.fileExist}
                  </div>
                ) : null}

                <span>
                  {selectedFile.length > 0 &&
                    selectedFile.map((file, index) => {
                      return (
                        <div key={file.name}>
                          {file.name}{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteSelectedFile(index)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                </span>
                <img src={imagePath} alt="User Image" width="40" height="40" />
              </div>

              <div className="form-group">
                <label>
                  Message<span>*</span>
                </label>
                <textarea
                  rows="3"
                  className={
                    "form-control" +
                    (formik.errors.message && formik.touched.message
                      ? " is-invalid"
                      : "")
                  }
                  placeholder=""
                  name="message"
                  onChange={(e) => handleMessage(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <div className="invalid-feedback">
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <button
                  id="edit"
                  type="submit"
                  className="btn btn-info btn-block"
                >
                  Edit
                </button>
              </div>

              <hr />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDataForm;
