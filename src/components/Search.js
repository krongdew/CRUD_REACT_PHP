import React,{ useEffect, useRef, useState  } from 'react'
import axios from "axios"


const Search = () => {
    
  //ใส่เป็น[]แทน{}เพื่อบอกว่าเป็นอารเรย์ค่าว่าง
  const [users, setUsers] = useState([]);  
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://mulifepass2.ac.th/phptest/user/")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data)
      });
  }
  
  
 // filter users
 
 const [filtered, setfiltered] = useState([]);
 const [search, setsearch] = useState("");

 const searchRef = useRef();

 useEffect(() => {
   setfiltered(
     users.filter((item) =>
       item.name.toLowerCase().includes(search.toLowerCase())
     )
   );
 }, [search]);
 
 
  return (
    <div className="app">
        <div className="searchbox">
        <form className="form-wrapper">
          <input
            type="text"
            id="search"
            placeholder="Search for..."
            onChange={(e) => setsearch(e.target.value)}
            ref={searchRef}
          />
          <input type="submit" value="go" id="submit"/>
        </form>
         
        {search.length > 0 && (
          <div className="dropdown">
            {filtered.length > 0 ? (
              filtered.map((item, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={(e) => {
                      searchRef.current.value = item.name;
                      setsearch("");
                    }}>
                    <p>{item.name}</p>
                  </div>
                );
              })
            ) : (
              <p>no match</p>
            )}
          </div>
        )}
        </div>
    </div>
  );
};
 
export default Search