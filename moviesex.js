let currentId = 0;
let moviesList = [];

$(function(){

  $("#new-movie-form").on('submit', function(e){
  e.preventDefault();
  let title = $("#title").val();
  let rating = $("#rating").val();

  let movieData = {title, rating, currentId};
  const HTMLtoAppnd = createMovieDataHTML(movieData);

  currentId++
  moviesList.push(movieData);

  $('#movie-table-body').append(HTMLtoAppnd);
  $("#new-movie-form").trigger("reset");
  
});


$('tbody').on('click',".btn.btn-danger", function(e){
  let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("deleteId"))
   moviesList.splice(indexToRemoveAt, 1)
   $(e.target).closest('tr').remove();
});

$('.fas').on('click', function(e){
 let direction =  $(e.target).hasClass('fa-sort-down') ? "down" : "up";
 let keyToSortBy = $(e.target).attr("id");
 let sortedMovies = sortBy(moviesList,keyToSortBy,direction);

 $("#movie-table-body").empty();

 for(let movie of sortedMovies){
   const HTMLtoAppend =  createMovieDataHTML(movie);
   $("#movie-table-body").append(HTMLtoAppend);
 }

 $(e.target).toggleClass("fa-sort-down");
 $(evt.target).toggleClass("fa-sort-up");
 });
});

function sortBy(array,keyToSortBy,direction){
       return array.sort(function(a,b){
              if(keyToSortBy === "rating"){
                     a[keyToSortBy] = +a[keyToSortBy];
                     b[keyToSortBy] = +b[keyToSortBy];
              }
      
if (a[keyToSortBy] > b[keyToSortBy]) {
       return direction === "up" ? 1 : -1;
}else if(b[keyToSortBy] > a[keyToSortBy]){
       return direction === "up" ? -1 : 1;
}
return 0;
 });
}
function createMovieDataHTML(data){
       return `
       <tr>
              <td>${data.title}</td>
              <td>${data.rating}</td>
              <td>
               <button class = "btn btn-danger" data-delete-id = ${data.currentId}>
                     Delete
                     </button>
              </td>
       </tr>
      `;
}