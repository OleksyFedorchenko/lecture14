import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import countriesActions from '../actions/countries'
import Button from '@mui/material/Button';
import {NavLink, useHistory} from 'react-router-dom';
import config from '../../../config/configExample';
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const getClasses = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function Countries() {
    const history = useHistory();
    const countries = useSelector(({countries}) => countries);
    const dispatch = useDispatch();
    const classes = getClasses();

    useEffect(() => {
        dispatch(countriesActions.fetchCountries())
        // eslint-disable-next-line
    }, []);

    const deleteCountry = (e) => {
        const id = e.currentTarget.id;
        if (window.confirm("Are you really want to delete an item?")) {
            fetch(config.BASE_URL+"/country/delete/" + id, {method: 'DELETE'})
                .then(() => {
                    dispatch(countriesActions.fetchCountries())
                })
        }
    }

    const handleOnClick = (e) => {
        const id = e.currentTarget.id;
        history.push('/addEditCountry/' + id);
    }

    return (
        <div className={classes.main}>
            <br/>
            <div>
                <NavLink to="/">Initial</NavLink>
            </div>
            <div>
                <NavLink to="/addEditCountry">AddCountry</NavLink>
            </div>
            <br/>
            {countries.isLoading && (
                <div>
                    <CircularProgress/>
                </div>
            )}
            {!countries.isLoading && (
                <div>
                    <br/>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <caption>Country table</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell align="right"><b>Continent</b></TableCell>
                                    <TableCell align="right"><b>Area</b></TableCell>
                                    <TableCell align="right"><b>Edit</b></TableCell>
                                    <TableCell align="right"><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {countries.list.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.continent}</TableCell>
                                        <TableCell align="right">{row.area}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" id={row.id}
                                                    onClick={handleOnClick}>Edit</Button>

                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" id={row.id} color="error"
                                                    onClick={deleteCountry}>Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>
            )}
        </div>
    )
}

export default Countries;