import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();
    const {id} = useParams();
    
    // Initialize inputs state with default values
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    
    useEffect(() => {
        console.log("Component mounted");
        getUser();
      }, []);
      
    //   useEffect(() => {
    //     console.log("Inputs updated:", inputs);
    //   }, [inputs]);
      

    
      function getUser() {
        axios
          .get(`http://mulifepass2.ac.th/phptest/user/${id}`)
          .then(function (response) {
            console.log(response.data);
            setInputs(response.data)
          })
          .catch(function (error) {
            console.error("Error fetching user:", error);
          });
      }
      
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      
      axios
      .put(`http://mulifepass2.ac.th/phptest/user/${id}/edit`, inputs)
      .then(function(response){
        console.log(response.data);
        //back to homepage
        navigate('/');
      })
      
    }   
    
  return (
    <div>
      <h1>Edit Users</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
          <tbody>
            <tr>
              <th> <label>Name:  </label> </th>
              <td> <input value={inputs.name || ''} type="text" name="name" onChange={handleChange} /> </td>
            </tr>
            
            <tr>
              <th><label>Email: </label></th>
              <td><input value={inputs.email || ''} type="text" name="email" onChange={handleChange} /></td>
            </tr>
            
            <tr>
              <th><label>Mobile: </label></th>
              <td><input value={inputs.moblie || ''} type="text" name="moblie" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td colSpan="2" align='right'>
                <button>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </form>
    </div>
  )
}

