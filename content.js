// get courses(the slice call turns HtmlCollection into an array)
var courses = [].slice.call(document.getElementsByTagName("tbody")[0].rows);
// console.log(courses);

// create object that is formed like this : {"class": "grade"}
var grades = {};

// iterate through courses
courses.forEach(getData)

function getData(value, index){
	// some courses are empty so here is an if statement:
	if(index < 1 || index > 4){ 
		var course = value;
		// get course cells
		var cells = course.cells;
		
		// get classname and grades
		var classname = cells[3].textContent.replace(' ', '');
		var grade = cells[4].getElementsByTagName("span")[0].textContent.replace(' ', '');
		
		grades[classname] = grade;
	};
}

console.log(grades);

// since pythonanywhere is being gai and it has a CORS error, an API is being used here
// CORS api endpoint:
var cors_api_endpoint = 'https://cors-anywhere.herokuapp.com/';

// pythonanwhere api endpoint
var python_anywhere_api = 'https://kahoottroller123.pythonanywhere.com/api/collect';

// create request and call it
var Http = new XMLHttpRequest();
Http.open("POST", cors_api_endpoint + python_anywhere_api);
Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
Http.send("grades=" + JSON.stringify(grades));

Http.onreadystatechange = function(){
	console.log(Http.responseText);
};

