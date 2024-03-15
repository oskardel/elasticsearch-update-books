//CHANGE IP IN URL
// ADD PAGINATION (MAYBE)
URL = "http://localhost:9200/books_data/_search"
URL_UPDATE = "http://localhosts:9200/books_data/_doc/"
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
            if (data.hits.total.value <= 0) {
                cardData.innerHTML += "<div>Your search did not match any documents</div>"
            }
            cardData.innerHTML += `<div class="card-info">
		    <label for="book-title">Title</label>
                <input type="text" id="book-title" value="${data.hits.hits[0]._source["Book-Title"]}">
                <label for="book-author">Author</label>
                <input type="text" id="book-author" value="${data.hits.hits[0]._source["Book-Author"]}">
                <label for="book-publisher">Publisher</label>
                <input type="text" id="book-publisher" value="${data.hits.hits[0]._source["Publisher"]}">
                <label for="year-publication">Publication year</label>
                <input type="number" id="year-publication" value="${data.hits.hits[0]._source["Year-Of-Publication"]}">
                <label for="image-large">Image</label>
                <input type="text" id="image-large" value="${data.hits.hits[0]._source["Image-URL-L"]}">
		    </div>
 		    <div class="card-image">
		        <img src="${data.hits.hits[0]._source["Image-URL-L"]}" alt="${data.hits.hits[0]._source["Book-Title"]}" id="book-img" style="background:url(https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg)">
		    </div>
            <button type="button" id="update-button">Update</button>`

            bookId = data.hits.hits[0]._id

            document.getElementById("update-button").addEventListener("click", function () {
                let updatData = {
                    "ISBN": isbnParameters,
                    "Book-Title": document.getElementById("book-title").value,
                    "Book-Author": document.getElementById("book-author").value,
                    "Publisher": document.getElementById("book-publisher").value,
                    "Year-Of-Publication": document.getElementById("year-publication").value,
                    "Image-URL-S": data.hits.hits[0]._source["Image-URL-S"],
                    "Image-URL-M": data.hits.hits[0]._source["Image-URL-M"],
                    "Image-URL-L": document.getElementById("image-large").value
                }
                if (document.getElementById("book-title").value == "" || document.getElementById("book-author").value == "" || document.getElementById("book-publisher").value == "" || document.getElementById("year-publication").value == "" || document.getElementById("image-large").value == "") {
                    alert("You can't leave any field blank")
                } else {
                    fetch(URL_UPDATE + bookId, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatData)
                    })
                    .then(response => {
                        if (!response.ok) {
                            alert("Error updating the document")
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then(data => {
                        alert("The book has been updated")
                    })
                }
            })
        })
})
