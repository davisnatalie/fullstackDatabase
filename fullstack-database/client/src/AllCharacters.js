import React, { useState, useEffect } from 'react';
import { API_URL } from './constants.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllCharacters() {
    const [serverData, setServerData] = useState([]);
    
  useEffect(() => {
    axios.get(`${API_URL}/allCharacters`)
      .then(async res => {
        console.log(res.data.payload)
        setServerData(res.data.payload);
      })
      .catch((e)=>console.log(e))
  }, [])

    const removeDots = {
        listStyleType:"none"
    }
    return ( 
    <ul>

{
      serverData.length > 0 ?
      serverData.map((character) => {
        return (
          <li key={character._id} style={removeDots}>
            <Link to={`/mcu/${character.name}`}>{character.name}</Link>
          </li>
        )
      })
      :
      <h1>loading...</h1>
      }

    </ul> );
}

export default AllCharacters;