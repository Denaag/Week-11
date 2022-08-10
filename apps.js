// console.log($("body")); //video 1 - from the console you will see Jquery is working

let p = $("#test");
let div = $(".my-class");
let ul = $("ul");

console.log(p);
console.log(div);
console.log(ul);

//p variable is the jquery element object that was returned from the jquery call above and the .text is a method on this object - console logs out Hello World
console.log(p.text()); 

//method that will change the Hello World in the HTML webpage to New Text - if you leave blank () then it displays Hello world. If you add blank string ("") it returns nothing as requested
p.text("New Text");

//$("input") is referencing input in HTML
//.val sets the value of the input to whatever string is added
//this will change the text box to New Value
// $("input").val("New Value");

//accessing the placehold attribute in our input field (access/change attributes) 
// instead of having a word auto placed there already like we did above with ("New Value")
//grab by our HTML tag name ("input")
//then .attr - method that we can change attribute on - this take 2 parameters - (what the attribute is, the value)
$("input").attr("placeholder", "Placeholder Text")

// to add a element to the DOM, we can use the 4 methods (append, prepend, before, after)
//append and prepend will add context to an existing element - either at the end of the elements current content/context or beginning
//before and after method allow us to add elements and content - either immediately after or before an existing element
div.prepend("<p>prepended paragraph</p>");
div.append("<p>appended paragraph</p>");
div.before("<p>paragraph that was added before the div</p>");
div.after("<p>paragraph added after the div</p>");

//to remove elements we have 2 methods we can use (remove and empty)
// remove method deletes the elements and all its children from the DOM
// empty method removes all the children of the selected element from the DOM
div.empty(); //this emptied the paragraphs out that we created above but div is still found in the inspector of webpage (making this an empty div now)
ul.remove(); //this removed all ul/li items/element both on screen and in the inspector of webpage

//Sometime we might want to hide an element from being displayed, but not remove it from the DOM altogether
// 2 methods we can use (hide and show)
$("input").hide();
setTimeout(() => $("input").show(), 2000);//will reveal the input after 2 seconds