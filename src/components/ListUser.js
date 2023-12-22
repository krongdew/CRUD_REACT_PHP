import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://mulifepass2.ac.th/phptest/user/")
      .then(function (response) {
        setUsers(response.data);
        setSearchResults(response.data); // เมื่อโหลดข้อมูลเริ่มต้นให้ตั้งค่า searchResults เป็นข้อมูลทั้งหมด
      });
  }

  const deleteUser = (id) => {
    axios.delete(`http://mulifepass2.ac.th/phptest/user/${id}/delete`).then(function(response) {
      getUsers();
    });
  }

  const handleSearch = (term) => {
    setSearchTerm(term);

    const filteredResults = users.filter((user) => (
      user.name && user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email && user.email.toLowerCase().includes(term.toLowerCase()) ||
      user.mobile && user.moblie.toLowerCase().includes(term.toLowerCase())
    ));

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <h1>List Users</h1>

      {/* เพิ่ม SearchBar หรือ component ค้นหาที่เป็นทางเลือก */}
      {/* ตัวอย่างเช่น: <SearchBar onSearch={handleSearch} /> */}
      <input
        type="text"
        placeholder="Search by name, email, or mobile"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.moblie}</td>
              <td>
                <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
