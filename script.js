URL = "http://localhost:9200/books_data/_search"
const formDiv = document.getElementById("form-div")
const cardData = document.getElementById("card-data")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", function () {
    cardData.innerHTML = ""
    let isbnParameters = document.getElementById("parameters-input").value

    fetch(URL + "?q=ISBN:" + isbnParameters)
    .then(response => {
        if (!response.ok) {
            cardData.innerHTML += "<div>Your search did not match any documents</div>"
            throw new Error('Network response was not ok')
        }
        return response.json()
    })
    .then(data => {
        if(data.hits.total.value <= 0){
            cardData.innerHTML += "<div>Your search did not match any documents</div>"
        }
        cardData.innerHTML += `<label for="book-title">Title</label>
            <input type="text" id="book-title" value="${data.hits.hits[0]._source["Book-Title"]}">
            <label for="book-author">Author</label>
            <input type="text" id="book-author" value="${data.hits.hits[0]._source["Book-Author"]}">
            <label for="book-publisher">Publisher</label>
            <input type="text" id="book-publisher" value="${data.hits.hits[0]._source["Publisher"]}">
            <label for="year-publication">Publication year</label>
            <input type="number" id="year-publication" value="${data.hits.hits[0]._source["Year-Of-Publication"]}">
            <button type="button" id="update-button">Update</button>
            `

            document.getElementById("update-button").addEventListener("click", function() {
                console.log("update")
            })
    })
})