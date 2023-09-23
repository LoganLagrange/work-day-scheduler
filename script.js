// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveBtnEl = $('.saveBtn');
var descriptionEl = $('.description')

$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // 
  // Click listener for the savebutton of a given timeblock
  saveBtnEl.on('click', function () {
    // Grab the save button as a variable and access the parent, grab the id of the parent div
    var saveBtn = $(this);
    var timeBlock = saveBtn.parent();
    console.log(timeBlock);
    var timeBlockId = timeBlock.attr("id");
    // Grab the textarea child of the timeblock
    console.log(timeBlockId)
    var description = timeBlock.children('textarea');
    console.log(description);
    // Grab the input of the textarea and save in local storage using timeblock id as key
    userInput = description.val();
    localStorage.setItem(timeBlockId, userInput);
    return (timeBlockId, timeBlock)
  })
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Function to update the timeblock colors
  function timeCheck() {
    // Access current hour
    var hour = dayjs().hour()
    // Grab timeblock elements and store in an array
    var timeBlockEl = $(".time-block");
    var timeBlockArr = timeBlockEl.toArray();
    // Loop over the timeblock elements within the array
    for (var i = 0; i < timeBlockArr.length; i++) {
      // Access the id of the timeblock element currently in the loop, use split to seperate the number from the rest of the id
      var timeBlockIdStr = timeBlockArr[i].id;
      var timeBlockHourArr = timeBlockIdStr.split("-");
      // Use parseInt to convert the hour number into a number variable type
      var blockHour = parseInt(timeBlockHourArr[1])
      // Conditional statement to check which color (class) should be applied and remove other classes
      if (blockHour === hour) {
        $(timeBlockArr[i]).addClass("present").removeClass('future past'); 
      } else if (blockHour < hour) {
        $(timeBlockArr[i]).addClass("past").removeClass("future present");
      } else if (blockHour > hour) {
        $(timeBlockArr[i]).addClass("future").removeClass("past present");
      }
    }
  }
  // Call the function to ensure colors are accurate on page load
  timeCheck();
  // Call the function every minute after to make sure colors are always accurate to current time
  setInterval(timeCheck, 60000);
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

