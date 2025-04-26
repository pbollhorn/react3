import React, { useState, useEffect } from "react";

function TimerJokeComponent() {
  // State to store the joke
  const [joke, setJoke] = useState("");

  // useEffect
  useEffect(() => {
    placeNewJoke();
    const intervalId = setInterval(placeNewJoke, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this runs once on mount

  async function placeNewJoke() {
    const jokeString = await fetchDadJokeFromApi();
    console.log(jokeString);
    setJoke(jokeString);
  }

  // Render the joke
  return (
    <div>
      <p>{joke}</p>
    </div>
  );
}

async function fetchDadJokeFromApi() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return "[Failed in getting the joke]";
    }

    const data = await response.json();
    return data.joke; // data.joke is the string with the joke
  } catch {
    return "[[[Something unexpected happend]]]";
  }
}

export default TimerJokeComponent;
