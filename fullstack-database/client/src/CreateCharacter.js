import React, { useState } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

function CreateCharacter() {
    const [name, setName] = useState("");
    const [debut, setDebut] = useState("");
    const [debutYear, setDebutYear] = useState(0);
    const navigate = useNavigate();

    async function postCharacter() {
        let newChar = {
            name: name,
            debut: debut,
            debutYear: debutYear
        }

        fetch(`${API_URL}/createCharacter`, {
            method: "post",
            body: JSON.stringify(newChar),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => {
            let serverResponse = await res.json()
            // console.log(serverResponse)
            navigate(`/mcu/${serverResponse.payload.name}`)
        })
        setName("");
        setDebut("");
        setDebutYear(0);
    }

    function handleOnSubmit(event){
        if(debutYear >= 0 && debutYear < 2100) {
            event.preventDefault();
        
            postCharacter();
        } else {
            alert('Year must be a number')
        }
    }

    return ( 
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <br /><br />
            <label>Name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <br /><br />

            <label>Debut Film </label>
            <input value={debut} onChange={(e) => setDebut(e.target.value)} />

            <br /><br />

            <label>Debut Year </label>
            <input value={debutYear} onChange={(e) => setDebutYear(e.target.value)} />

            <br /><br />

            <button type="submit">Submit</button>
        </form>

     );
}

export default CreateCharacter;