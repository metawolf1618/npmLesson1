import { setFootballData } from './api.js';

(() => {
  const fetchBtn = document.querySelector('#fetch-btn');
  const resultsSection = document.querySelector('#results-section');

  function renderUI(footballData, giphyData) {
    resultsSection.innerHTML = '';

    // Football Standings
    const heading = document.createElement('h2');
    heading.textContent = 'Premier League Top Teams';
    resultsSection.appendChild(heading);

    const teams = footballData.standings[0].table.slice(0, 5);
    teams.forEach(item => {
      const p = document.createElement('p');
      p.textContent = `${item.position}. ${item.team.name} - ${item.points} pts`;
      resultsSection.appendChild(p);
    });

    // Giphy GIFs
    const gifHeading = document.createElement('h2');
    gifHeading.textContent = 'Team GIFs';
    resultsSection.appendChild(gifHeading);

    giphyData.data.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height_small.url;
      resultsSection.appendChild(img);
    });
  }

  function loadData() {
    const cachedFootball = localStorage.getItem('football');
    const cachedGiphy = localStorage.getItem('giphy');

    if (cachedFootball && cachedGiphy) {
      renderUI(JSON.parse(cachedFootball), JSON.parse(cachedGiphy));
      return;
    }

    setFootballData()
      .then(data => {
        if (data) renderUI(data.footballData, data.giphyData);
      })
      .catch(err => console.error(err));
  }

  fetchBtn.addEventListener('click', () => {
    localStorage.clear();
    loadData();
  });

  loadData();
})();