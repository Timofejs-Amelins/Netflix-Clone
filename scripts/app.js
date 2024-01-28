// get the authorisation tokens
import { options } from "./apikey.js";

// takes and returns api requests in json
async function getTmdbData(url) {
	let res = await fetch(url, options);
	let res_json = await res.json();
	return res_json;
}

// gets, manipulates, and returns movie data
async function processMovieData() {
	const page1 = await getTmdbData("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc");
	const page2 = await getTmdbData("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc");
	const page3 = await getTmdbData("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc");
	const genresData = await getTmdbData("https://api.themoviedb.org/3/genre/movie/list?language=en");

	const pages = page1.results.concat(page2.results, page3.results.slice(0, 10));

	const moviesData = {
		pages: pages,
		genresData: genresData.genres,
	};
	return moviesData;
}

// takes the processed movie data and displays it
async function displayMovieData() {
	const moviesData = await processMovieData();
	const movieContent = document.getElementById("movieContent");
	const moviesSectionName = document.createElement("div");
	moviesSectionName.textContent = "Movies";
	movieContent.appendChild(moviesSectionName);
	// iterate over the response and display movie data
	for (let movieData of moviesData.pages) {
		let movieDataOutput = document.createElement("div");
		let movieImage = document.createElement("div");
		movieImage.innerHTML = '<img src="'.concat("https://image.tmdb.org/t/p/w185", movieData.poster_path, '" alt="', movieData.title, '">');
		movieDataOutput.appendChild(movieImage);
		let adultRating = document.createElement("div");
		adultRating.innerText = "Adult Rating: ";
		// display adult rating of movie
		if (movieData.adult == false) {
			adultRating.innerText += "Not Adult";
		} else {
			adultRating.innerText += "Adult";
		}
		movieDataOutput.appendChild(adultRating);
		let releaseDate = document.createElement("div");
		releaseDate.innerText = "Released: " + movieData.release_date;
		movieDataOutput.appendChild(releaseDate);
		let genresSection = document.createElement("div");
		let genresSectionName = document.createElement("div");
		genresSectionName.innerHTML = "Genres:";
		genresSection.appendChild(genresSectionName);
		let genresList = document.createElement("ol");
		// add genres to ordered list
		for (let genreData of moviesData.genresData) {
			// if genre id is in movie's genre ids, add that genre
			if (movieData.genre_ids.indexOf(genreData.id) !== -1) {
				let movieGenre = document.createElement("li");
				movieGenre.innerText = genreData.name;
				genresList.appendChild(movieGenre);
			}
		}
		genresSection.appendChild(genresList);
		movieDataOutput.appendChild(genresSection);
		let movieOverview = document.createElement("div");
		movieOverview.innerText = movieData.overview;
		movieDataOutput.appendChild(movieOverview);
		movieContent.appendChild(movieDataOutput);
	}
}

// gets, manipulates, and returns TV data
async function processTvsData() {
	const page1 = await getTmdbData("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc");
	const page2 = await getTmdbData("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=2&sort_by=popularity.desc");
	const page3 = await getTmdbData("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=3&sort_by=popularity.desc");
	const genresData = await getTmdbData("https://api.themoviedb.org/3/genre/tv/list?language=en");

	const pages = page1.results.concat(page2.results, page3.results.slice(0, 10));

	const tvData = {
		pages: pages,
		genresData: genresData.genres,
	};
	return tvData;
}

async function displayTvsData() {
	const tvsData = await processTvsData();
	const tvsContent = document.getElementById("tvsContent");
	const tvsSectionName = document.createElement("div");
	tvsSectionName.textContent = "TV Shows";
	tvsContent.appendChild(tvsSectionName);
	// iterate over the response and display movie data
	for (let tvData of tvsData.pages) {
		let tvDataOutput = document.createElement("div");
		let tvImage = document.createElement("div");
		tvImage.innerHTML = '<img src="'.concat("https://image.tmdb.org/t/p/w185", tvData.poster_path, '" alt="', tvImage.title, '">');
		tvsContent.appendChild(tvImage);
		let releaseDate = document.createElement("div");
		releaseDate.innerText = `Released: ${tvData.first_air_date}`;
		tvsContent.appendChild(releaseDate);
		let genresSection = document.createElement("div");
		let genresSectionName = document.createElement("div");
		genresSectionName.innerHTML = "Genres:";
		genresSection.appendChild(genresSectionName);
		let genresList = document.createElement("ol");
		// add genres to ordered list
		for (let genreData of tvsData.genresData) {
			// if genre id is in movie's genre ids, add that genre
			if (tvData.genre_ids.indexOf(genreData.id) !== -1) {
				let tvGenre = document.createElement("li");
				tvGenre.innerText = genreData.name;
				genresList.appendChild(tvGenre);
			}
		}
		genresSection.appendChild(genresList);
		tvDataOutput.appendChild(genresSection);
		let tvOverview = document.createElement("div");
		tvOverview.innerText = tvData.overview;
		tvDataOutput.appendChild(tvOverview);
		tvsContent.appendChild(tvDataOutput);
	}
}

displayMovieData();
displayTvsData();

// async function processSearchedMovies() {
// 	const query = document.getElementById("query").value;
// 	console.log(query);
// 	const results = await getTmdbData("https://api.themoviedb.org/3/search/movie?query=" + query + "&include_adult=false&language=en-US&page=1");
// 	console.log(results);
// }
// const searchButton = document.getElementById("searchButton");
// searchButton.addEventListener("click", processSearchedMovies);
// searchButton.addEventListener("click", displaySearchedTvs);
