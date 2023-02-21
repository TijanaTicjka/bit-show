"use strict";
const dataModule =(function() {
  class TvShow {
    constructor(name,id, rating, image) {
      this.name = name;
      this.id = id;
      this.rating = rating;
      this.image = image;
    }
  }

  class DetailedShow extends TvShow {
    constructor(name,id, image, castList, seasonsList, description) {
      super(name,id,image);
      this.castList = castList;
      this.seasonsList = seasonsList;
      this.description = description
    }
  }

  class Season {
    constructor(startDate, endDate) {
      this.startDate = startDate,
      this.endDate = endDate
    }
  }

  const getShows = () => {
    return fetch("https://api.tvmaze.com/show")
      .then(response => response.json()) 
      .then(shows => {
        const allShows = [];
        shows.map(show => {
          const createdShow = new TvShow(show.name, show.id, show.rating.average, show.image.original);
          allShows.push(createdShow);
        })
        allShows.sort((a,b) => b.rating - a.rating);
        const top50 = allShows.slice(0,50);
        return top50;
      })
  }

  const searchShow = (input) => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(data => data.slice(0, 10).map(({ show }) => {
          const { name, id, rating, image } = show;
          const imageSearch = image ? image.original : "";
          return new TvShow(name, id, rating, imageSearch);
        })
      )
  }

  const getDetailedShow = (id) => {
    return fetch(`http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(function (res) {
        return res.json();
      })
      .then(function (show) {
        const imageToUse = show.image ? show.image.original : '';
        const seasons = [];
        const cast = [];
        const summary = show.summary;
        show._embedded.seasons.forEach(({ premiereDate, endDate }) => {
            const seasonString = (premiereDate && endDate)
                ? `${premiereDate} - ${endDate}`
                : "Data Not Available";
            seasons.push(seasonString);
        });
        show._embedded.cast.forEach(({ person }) => {
            cast.push(person.name);
        });

        return new DetailedShow(show.name, show.id, imageToUse, seasons, cast.slice(0, 7), summary)
    })
}

  return {
    getShows,
    searchShow,
    getDetailedShow 
    
  }

})()