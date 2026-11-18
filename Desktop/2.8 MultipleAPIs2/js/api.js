import { KEY_FOOTBALL, KEY_GIPHY } from './api.js';

export const setFootballData = () => {
  console.log("Fetch new data");
  
  return fetch("https://api.football-data.org/v2/competitions/2021/standings", {
    "method": "GET",
    "headers": {
      "X-Auth-Token": `${KEY_FOOTBALL}`
    }
  })
    .then(response => {
      console.log("response: ", response);
      return response.json();
    })
    .then(json => {
      console.log("json ", json);
      localStorage.setItem('football', JSON.stringify(json));

      const topTeam = json.standings[0].table[0].team.name;
      const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${KEY_GIPHY}&q=${encodeURIComponent(topTeam)}&limit=3`;

      return fetch(giphyUrl)
        .then(response => response.json())
        .then(giphyJson => {
          localStorage.setItem('giphy', JSON.stringify(giphyJson));
          return { footballData: json, giphyData: giphyJson };
        });
    })
    .catch(err => {
      console.error(err);
    });
};