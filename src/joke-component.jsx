import React, { useState, useEffect } from "react";

function JokeComponent() {
  // State to store the joke
  const [joke, setJoke] = useState("");

  // useEffect
  useEffect(() => {
    placeNewJoke();
  }, []); // Empty dependency array means this runs once on mount

  function placeNewJoke() {
    fetchJokeFromApi()
      .then((jokeString) => setJoke(jokeString))
      .catch((error) => {
        setJoke("(Could not get joke)");
        console.error("Error fetching joke:", error);
      });
  }

  // Render the joke
  return (
    <div>
      <p>{joke}</p>
      <button onClick={placeNewJoke}>Get new joke</button>
    </div>
  );
}

function fetchJokeFromApi() {
  return fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }

      return response.json();
    })
    .then((data) => {
      return data.value; // data.value is the string with the joke
    });
}

export default JokeComponent;
