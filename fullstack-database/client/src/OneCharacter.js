import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';


function OneCharacter() {
    const { name } = useParams()

    const navigate = useNavigate() 

    const [character, setCharacter] = useState({
        debut: "",
        debutYear: ""
    })

    const [isEditing, setIsEditing] = useState(false)

    function toggleEditing(){
        isEditing ? setIsEditing(false) : setIsEditing(true)
    }

    function updateCharacter({target}){
        setCharacter((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    function handleDelete() {
        fetch(`${API_URL}/deleteCharacter/${character._id}`,
            {
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(() => navigate('/mcu'))
    }

    useEffect(() => {
        fetch(`${API_URL}/getCharacterByName/${name}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => {
            let result = await res.json()
            setCharacter(result.payload)
        })
    }, [name, isEditing])

    function handleOnSubmit(e) {
        e.preventDefault();
    
        alert("Changes Saved!");
    
        const sendBody = {
            debut: character.debut,
            debutYear: character.debutYear
        }
            
        fetch(`${API_URL}/updateCharacter/${character._id}`, {
            method: "put",
            body: JSON.stringify(sendBody),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            setIsEditing(false)
        })
    }

    return ( 
        <>
        <h1>{character.name}</h1>
        <form onSubmit={handleOnSubmit}>
        <p>
            Debuted in&nbsp;
            {
                isEditing ? 
                <input type="text" name = "debut" value={character.debut} onChange={updateCharacter}/>
                :
                <span>{character.debut}</span>
            }

        </p>
        <p> 
            Released in&nbsp;
            {
                isEditing ? 
                <input type="text" name = "debutYear" value={character.debutYear} onChange={updateCharacter}/>
                :
                <span>{character.debutYear}</span>
            }
 
        </p>

        {isEditing ? <button type="submit">Submit Edit</button> : <br/>}

        </form>
        
        <button onClick={toggleEditing}>
            {
                isEditing ?
                "Cancel Changes"
                :
                "Edit Character Details"
            }
        </button>
        <br />
        <br />
        <button onClick={handleDelete}>
            DELETE character 
            <br />`Do not Click`        
        </button>

        </>
     );
}

export default OneCharacter;