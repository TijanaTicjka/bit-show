"use strict";
(function(data,ui) {
  const getData = () => {
    data.getShows()
      .then(res => ui.renderHomePage(res))
  };

  getData();

  const searchInput = document.querySelector(".searchField");
  
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

  const resultsList = document.querySelector(".results");
  resultsList.addEventListener("click", function (event) {
    const selectedElement = event.target;
    const idShow = selectedElement.id;
    //console.log(idShow);
    ui.clearMain()
    const detailsOfShow = data.getDetailedShow(idShow).then(res => ui.fillShowInfoPage(res));
    ui.clearList();
    ui.clearInput();
    ui.showDropDown()
   
  })

  
})(dataModule,uiModule)