const config = {
  api_key: '1b442f9302d4691dc36a36376322500f',
  api_base_url: 'https://api.themoviedb.org/3/',
  image_base_url: 'https://image.tmdb.org/t/p/w1280'
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector('input[name="query"]').value;
  const apiKey = config.api_key;
  const apiUrl = `${config.api_base_url}search/movie?api_key=${apiKey}&query=${searchQuery}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      createMovieElements(data.results);
    })
    .catch(error => {
      console.log('Error:', error.message);
    });
});

function createMovieElements(movies) {
  const resultsSection = document.querySelector('#results');
  resultsSection.innerHTML = ''; // clear any previous results
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    
    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `${config.image_base_url}${movie.poster_path}`;
    moviePoster.alt = `${movie.title} poster`;
    movieCard.appendChild(moviePoster);
    
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;
    movieInfo.appendChild(movieTitle);
    
    const movieReleaseDate = document.createElement('p');
    movieReleaseDate.classList.add('movie-release-date');
    movieReleaseDate.textContent = `Release date: ${movie.release_date}`;
    movieInfo.appendChild(movieReleaseDate);
    
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('read-more-button');
    readMoreButton.dataset.id = movie.id;
    readMoreButton.textContent = 'Read More';
    movieInfo.appendChild(readMoreButton);
    
    movieCard.appendChild(movieInfo);
    resultsSection.appendChild(movieCard);
  });
  
  const options = {
    rootMargin: '0px',
    threshold: 0.5
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  document.querySelectorAll('.movie-card').forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
  });
}



const resultsSection = document.querySelector('#results');
resultsSection.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const movieId = event.target.getAttribute('data-id');
    // call function to display more information about the selected movie
  }
});

// Observer l'élément pour le faire apparaitre lorsqu'il est visible
const options = {
  rootMargin: '0px',
  threshold: 0.5
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      observer.unobserve(entry.target);
    }
  });
}, options);
document.querySelectorAll('div').forEach(div => {
  div.classList.add('hidden');
  observer.observe(div);
});


// read more 
resultsSection.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const movieId = event.target.getAttribute('data-id');
    const apiKey = config.api_key;
    const apiUrl = `${config.api_base_url}movie/${movieId}?api_key=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayMovieDetails(data);
      })
      .catch(error => {
        console.log('Error:', error.message);
      });
  }
});

function displayMovieDetails(movie) {
  const modal = document.querySelector('#modal');
  const modalTitle = document.querySelector('#modal-title');
  const modalOverview = document.querySelector('#modal-overview');
  modalTitle.textContent = movie.title;
  modalOverview.textContent = movie.overview;
  modal.style.display = 'block';
}

const modalClose = document.querySelector('.close');
modalClose.addEventListener('click', () => {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';
});
