import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { data } from "../../data/data";
import "./search.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import glas from "../.././assets/glas.png";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Search(props) {
  const useStyles = makeStyles({
    links: {
      color: "var(--color)",
      marginBottom: "16px",
      cursor: "pointer",
      border: "none",
    },
    input: {
      color: "#E68D00",
      backgroundColor: "white",
    },
  });
  const classes = useStyles();

  //<----------STATES---------->
  const [title, setTitle] = useState("");
  const [titleSearch, setTitleSearch] = useState([]);

  //<----------SEARCH FUNCTION---------->
  //handle the input and filtering a new array that contains the search results
  const handleChange = (e) => {
    setTitle(e.target.value);
    const filteredTitle = data.features.filter((value) => {
      return value.properties.NAME.toLowerCase().includes(title);
    });
    setTitleSearch(filteredTitle);
  };

  //<----------COORDINATES FUNCTION---------->
  //picking up the cords from the clicked link in my search, resetting title
  const getCoordinates = (data) => {
    props.panTo(data);
    setTitle("");
  };

  return (
    <form className="search" type="text">
      <TextField
        autoComplete="off"
        value={title}
        className={classes.input}
        onChange={handleChange}
        label="Search"
        size="small"
        id="outlined-basic"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={glas} alt="" />
            </InputAdornment>
          ),
        }}
      />
      {title ? (
        <div className="search-results">
          {titleSearch.map((data) => {
            return (
              <Link
                onClick={() => getCoordinates(data)}
                key={data.properties.PARK_ID}
                className={classes.links}
              >
                {data.properties.NAME}
              </Link>
            );
          })}
        </div>
      ) : null}
    </form>
  );
}
