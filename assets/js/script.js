// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(document).ready(function () {
  var saveBtnEl = $('.saveBtn');
  
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
  })
  
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
  
  // Function to get data from localStorage
  function getData() {
    // Grab timeblock elements and store in an array
    var timeBlockEl = $(".time-block");
    var timeBlockArr = timeBlockEl.toArray();
    // Initialize array for past data entries
    var pastEntries = [];
    // Loop to grab all the entries from localStorage 
    for (var i = 0; i < timeBlockArr.length; i++) {
      // Create a key using current loop index to match localStorage key
      var key = "hour-" + (i+9);
      console.log(key);
      // Grab entry from localStorage and set in entry variable
      var entry = localStorage.getItem(key);
      console.log(entry);
      // store entry in array of past data
      pastEntries[i] = entry;
    }
    // Loop to display past enries in corresponding textarea
    for (var i = 0; i < timeBlockArr.length; i++) {
      console.log(timeBlockArr[i]);
      // Grab element currently in loop
      var timeBlock = $(timeBlockArr[i]);
      // GRab textarea child of timeblock
      var textArea = timeBlock.children("textarea");
      // Set value of textarea to corresponding past entry
      $(textArea).val(pastEntries[i]);
    }
    console.log("pastentries:" + pastEntries);
    
  }
  getData();
 
  // Function to set date on header
  function setDate() {
    // Grab element to display in
    var headerDate = $("#currentDay");
    // Access and format the date to make it look nice
    var date = dayjs().format("ddd, MMMM D h:mmA");
    // Set the text of the header date
    headerDate.text(date);
  }
  // Call the function to ensure colors are accurate on page load
  setDate();
  // Call the function every second after to make sure date is always accurate to current time
  setInterval(setDate, 1000);
});

