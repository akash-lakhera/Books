An express based REST API that uses Passport for authentication.

Information about routes :

"/register" registers a new user and accepts a post request with username and password in body
"/login" logs in the user and accepts a post request with username and password in body
"/logout" logs the user out and accepts a post request

"/api/books" get request returns all books and post request adds a new book
"/api/:book" get request returns particular book, put request modifies it and delete deletes the book
