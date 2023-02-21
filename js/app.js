"use strict";
(function(data,ui) {
  const getData = () => {
    data.getShows()
      .then(res => ui.renderHomePage(res))
  };

  getData();

  const searchInput = document.querySelector(".searchField");
  const resultsList = document.querySelector(".results");
  const home = document.getElementById("home");
  const mainRow = document.querySelector("#mainRow");
  
  searchInput.addEventListener("keyup", event => {
    const searchTerm = event.target.value;
    ui.showDropDown();
    let res = data.searchShow(searchTerm).then(res => res.forEach(element => {
      //console.log(element);
      ui.searchResults(element);
    }));
    ui.clearList();
    ui.showDropDown();
  })

  resultsList.addEventListener("click", event => {
    const selectedElement = event.target;
    const idShow = selectedElement.id;
    //console.log(idShow);
    ui.clearMain()
    const detailsOfShow = data.getDetailedShow(idShow).then(res =>
       ui.fillShowInfoPage(res));
    ui.clearList();
    ui.clearInput();
    ui.showDropDown()
  })

  home.addEventListener("click", () => {
    getData();
    ui.fixMainTitle();
    ui.clearMain()
  })

  mainRow.addEventListener("click", (event) => {
    const element = event.target;
    //console.log(element.id);
    data.getDetailedShow(element.id).then(res =>
      ui.fillShowInfoPage(res));
  })
  
})(dataModule,uiModule)