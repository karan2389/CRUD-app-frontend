import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidation.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      name.length < 5 ||
      mobile.length > 10 ||
      isNaN(mobile) ||
      !isValidEmail(email)
    ) {
      alert("Please fill in the form correctly.");
      return;
    }

    const newData = {
      name: name,
      mobile: mobile,
      email: email,
    };

    setFormData([...formData, newData]);
    setName("");
    setMobile("");
    setEmail("");
  };

  const handleDelete = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  const handleEdit = (index) => {
    const data = formData[index];
    setName(data.name);
    setMobile(data.mobile);
    setEmail(data.email);
    handleDelete(index);
  };

  return (
    <div className="container">
      <div id="form-container">
        <h1 className="heading">Web Form:</h1>
        <form onSubmit={handleSubmit}>
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
          <button className="s-button">Submit</button>
        </form>
      </div>

      <div id="list-container">
        <h1 className="heading">List: </h1>
        <table className="h-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
