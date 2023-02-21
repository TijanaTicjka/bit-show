"use strict";

const uiModule =(function() {
    const mainRow = document.querySelector("#mainRow");
    const renderHomePage  = function (arr) {
        arr.forEach(element => {
            let divShow = `<div class="card pt-3" style="width: 18rem;">
            <img src=${element.image} class="card-img-top img-thumbnail alt="...">
            <div class="card-body">
              <a href="showInfoPage.html" id="info" class="card-lin text-decoration-none"><h5 class="card-title">${element.name}</h5></a>
            </div>
            </div>`
            mainRow.innerHTML += divShow;
        });
    }

    const resultsList = document.querySelector(".results");
    const resultDiv = document.querySelector(".dropdown");
    const searchInput = document.querySelector(".searchField");

    const searchResults = (show) => {
        let title = show.name
        let li = `<li><a class="dropdown-item text-wrap" id="${show.id}" href="#">${title}</a></li>`
        resultsList.innerHTML += li;

    };

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
    
    const mainTitle = document.getElementById("first");
    
    const fillShowInfoPage = (show) => {
        let titleShow = show.name;
         mainTitle.textContent = titleShow
    }
    
    const clearInput = () => {
        searchInput.value = "";
    }

    return {
        renderHomePage,
        searchResults,
        clearList,
        showDropDown,
        clearMain,
        fillShowInfoPage,
        clearInput 

    }
})()