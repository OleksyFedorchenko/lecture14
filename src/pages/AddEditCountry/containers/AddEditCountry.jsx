import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const getClasses = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around',
    },
}));

function AddEditCountry() {
    const [name, setName] = useState('');
    const [continent, setContinent] = useState('');
    const [area, setArea] = useState('');
    let params = useParams();
    let history = useHistory();
    const classes = getClasses();


    useEffect(() => {
        if (params.id) {
            getCountryById(params.id)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(country => {
                                setName(country.name);
                                setContinent(country.continent);
                                setArea(country.area);
                            })
                    } else {
                        console.log('Error with status' + response.status)
                    }
                })
        }
        // eslint-disable-next-line
    }, []);

    const getCountryById = (id) => {
        const url = "http://localhost:8080/country/" + id;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };
        return fetch(url, options);
    }

    const postCountry = () => {
        const requestBody = {
            name: name,
            continent: continent,
            area: area,
        }
        const url = "http://localhost:8080/country";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestBody),
        };
        return fetch(url, options);
    }

    const editCountry = () => {
        const requestBody = {
            id: params.id,
            name: name,
            continent: continent,
            area: area,
        }
        const url = "http://localhost:8080/country/edit";
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestBody),
        };
        return fetch(url, options);
    }

    const postData = (e) => {
        e.preventDefault()
        if (area < 0) {
            alert("Area field should be more than 0!");
        } else {

            if (params.id) {
                editCountry().then(response => {
                    if (response.ok) {
                        console.log("Country was editing in list");
                        history.push('/countries');
                    } else {
                        console.log('Error with status ' + response.status);
                    }
                })
            } else {

                postCountry().then(response => {
                    if (response.ok) {
                        console.log("Country was added to list");
                        history.push('/countries');
                    } else {
                        console.log('Error with status ' + response.status);
                    }
                })
            }
        }
    }
    return (
        <div className={classes.main}>
            <br/>
            <form className="add-country">
                <TextField label="name" name="name" onChange={(e) => setName(e.target.value)} value={name}/>
                <br/>
                <TextField label="continent" name="continent" onChange={(e) => setContinent(e.target.value)}
                           value={continent}/>
                <br/>
                <TextField type="number" InputProps={{inputProps: {min: 0}}} label="area" name="area"
                           onChange={(e) => setArea(e.target.value)} value={area}/>
                <br/>
                <Button onClick={postData} variant="contained" type="submit">Add / Edit</Button>
                <br/>
                <Button onClick={() => (history.push('/countries'))} variant="contained" color="error">Cancel</Button>
            </form>
        </div>
    )

}

export default AddEditCountry;