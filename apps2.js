//get method - 1st parameter is the url that we are going to send the http get request to.
//2nd parameter - method/function that we are going to invoke once the response is returned
$.get("https://reqres.in/api/users/2", (data) => console.log(data));

//post request (example below is creating a new user) - 1st parameter is still the url that we send request to
//2nd or middle argument - payload meaning what are we going to send (we are sending an object with curly braces {})
//3rd parameter - what do we do with the response that we get back (method/function that will console log for example)
$.post("https://reqres.in/api/users", {
    name: "Tommy",
    job: "Front End Software Developer"
}, (data) => console.log(data));