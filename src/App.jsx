import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./utils/BaseUrl";


const App = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseUrl}/get`).then((res) => {
        setData(res.data);
      });
    };

    fetchData();
  }, [updateList]);
  const addData = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/create`, { name: name, mobile: mobile, email: email })
      .then(() => {
        setName("");
        setMobile("");
        setEmail("");
        setUpdateList((prevState) => !prevState);
      });
  };
  const removeData = (id) => {
    axios.delete(`${baseUrl}/delete/${id}`).then(() => {
      setUpdateList((prevState) => !prevState);
    });
  };
  const updateMode = (id, user, tele, mail) => {
    setName(user);
    setMobile(tele);
    setEmail(mail);
    setUpdateId(id);
  };

  const updateData = () => {
    axios
      .put(`${baseUrl}/update/${updateId}`, {
        name: name,
        mobile: mobile,
        email: email,
      })
      .then(() => {
        setName("");
        setMobile("");
        setEmail("");
        setUpdateList((prevState) => !prevState);
        setUpdateId("");
      });
  };

  return (
    <>
      <div className="container">
        <div id="form-container">
          <h1 className="heading">Web Form:</h1>
          <form onSubmit={updateId ? updateData : addData}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              className="input"
              onChange={(e) => setName(e.target.value)}
              required
              minLength="5"
            />
            <br />
            <br />
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              placeholder="Mobile No."
              className="input"
              maxLength="10"
              pattern="[0-9]+"
            />
            <br />
            <br />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <br />
            <button className="s-button">
              {updateId ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <div id="list-container">
          <h1 className="heading">List: </h1>
          <table className="h-table">
            <thead className="h-container">
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {data.map((info) => (
              <tbody className="h-container" key={info._id} id={info._id}>
                <tr>
                  <td>{info.name}</td>
                  <td>{info.mobile}</td>
                  <td>{info.email}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        updateMode(info._id, info.name, info.mobile, info.email)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => removeData(info._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
