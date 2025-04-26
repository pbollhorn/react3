import React, { useState, useEffect } from "react";

function TimerJokeComponent() {
  // State to store the joke
  const [joke, setJoke] = useState("");

  // useEffect
  useEffect(() => {
    placeNewJoke();
  }, []); // Empty dependency array means this runs once on mount

  async function placeNewJoke() {
    const jokeString = await fetchChuckNorrisJokeFromApi();
    setJoke(jokeString);
  }

  // Render the joke
  return (
    <div>
      <p>{joke}</p>
      <button onClick={placeNewJoke}>Get new joke</button>
    </div>
  );
}

async function fetchChuckNorrisJokeFromApi() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    if (!response.ok) {
      return "[Failed in getting the joke]";
    }

    const data = await response.json();
    return data.value; // data.value is the string with the joke
  } catch {
    return "[[[Something unexpected happend]]]";
  }
}

export default TimerJokeComponent;
