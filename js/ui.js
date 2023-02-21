"use strict";

const uiModule =(function() {
    const mainRow = document.querySelector("#mainRow");
    const resultsList = document.querySelector(".results");
    const resultDiv = document.querySelector(".dropdown");
    const searchInput = document.querySelector(".searchField");
    const mainTitle = document.getElementById("first");

    const renderHomePage  = function (arr) {
        arr.forEach(element => {
            let divShow = `<div class="card pt-3 shadow-lg p-3 mb-5 bg-body rounded text-center" style="width: 18rem;">
            <img src=${element.image} class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
              <a href="" id="${element.id}" class="card-lin text-decoration-none"><h5 class="card-title">${element.name}</h5></a>
            </div>
            </div>`
            mainRow.innerHTML += divShow;
        });
    }

    const searchResults = (show) => {
        let title = show.name
        let li = `<li><a class="dropdown-item text-wrap" id="${show.id}" href="#">${title}</a></li>`
        resultsList.innerHTML += li;
    }

    const showDropDown = () => {
        if(searchInput.value){
            resultsList.style.display ="block"
        } else {
            resultsList.style.display = "none";
        }
    }

    const clearList = () => {
        resultsList.innerHTML = "";
    }

    const clearMain = () => {
        mainRow.innerHTML = "";
    }

    const fillShowInfoPage = (show) => {
        console.log(show);
        let titleShow = show.name;
        mainTitle.textContent = titleShow;
        let seasons = show.seasonsList;
        console.log(seasons);
        let casts = show.castList;
        console.log(casts);
        let colomsForDetails = `<div class="card mb-5">
        <div class="row shadow-lg p-3 mb-5 bg-body rounded d-flex  justify-content-center">
          <div class="col-md-7 g-0 d-flex justify-content-center ">
            <img src="${show.image}" class="img-fluid rounded" alt="...">
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <h5 class="card-title">Seasons(${seasons.length})</h5>
              <ul class="list-group list-group-flush">`;
        for (let index = 0; index < seasons.length; index++) {
            const element = seasons[index];
            colomsForDetails += `<li class="list-group-item">${element}</li>`
        };
        colomsForDetails += `</ul>
           <h5>Cast</h5> 
           <ul class="list-group list-group-flush">`;
        for (let index = 0; index < casts.length; index++) {
            const element = casts[index];
            colomsForDetails += `<li class="list-group-item">${element}</li>`
        };
        colomsForDetails += `</ul>
        </div>
        </div>
          <div class="col px-5">
          <h5 class="mt-3">Show Details</h5>
          <p>${show.description}</p></div>
        </div>
        </div>
      </div>`
       
        mainRow.style.width="90%";
        mainRow.innerHTML = colomsForDetails;
    }

    const clearInput = () => {
        searchInput.value = "";
    }

    const fixMainTitle = () => {
        mainTitle.textContent = "Popular Shows";
    }

    return {
        renderHomePage,
        searchResults,
        clearList,
        showDropDown,
        clearMain,
        fillShowInfoPage,
        clearInput,
        fixMainTitle 
    }
})()