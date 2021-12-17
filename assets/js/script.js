//global variable for element with currentDay id
var displayTimeEl = $("#currentDay");
// global variable for element with container class
var containerEl = $(".container");
// global varibale of array of objects, military time is used for background color of time rows
var timeBlk = [
  {
    time: 9,
    milTime: 09,
  },
  {
    time: 10,
    milTime: 10,
  },
  {
    time: 11,
    milTime: 11,
  },
  {
    time: 12,
    milTime: 12,
  },
  {
    time: 1,
    milTime: 13,
  },
  {
    time: 2,
    milTime: 14,
  },
  {
    time: 3,
    milTime: 15,
  },
  {
    time: 4,
    milTime: 16,
  },
  {
    time: 5,
    milTime: 17,
  },
];

//function to display the current time updated each second in format (dayofweek, month dayNumber year, hour:minutes:seconds am/pm)
function displayTime() {
  var now = moment().format("dddd, MMMM Do YYYY, h:mm a");
  displayTimeEl.text(now);
}
//function to create the display of the work day planner
function createRow() {
  //for each loop takes in the array of objects and creates rows with children elements and adds classes to them
  timeBlk.forEach(function (tm) {
    // creates the rows with form element and adds te row class from bootstrap and my style.css
    var contRow = $("<form>").addClass("row time-block");
    //creates the 1st column in each row and sets them to 1/6 of the container, adds class hour, and adds am and pm to relative hours based on military time
    var hourly = $("<div>").addClass("col-2 hour");
    if (tm.milTime < 12) {
      hourly.text(tm.time + "am");
    } else {
      hourly.text(tm.time + "pm");
    }
    // creates the todo column that takes up 2/3 of the container and adds the description class as well as bootstrap 0 padding class
    var task = $("<textarea>").addClass("col-8 description p-0");
    // adds a name attribute of the time block so each row can be targeted by functions based on the hour
    task.attr("name", tm.time);
    //sets tasks that have been already stored locally to variable
    var prevTask = localStorage.getItem(tm.time);
    //if text is empty val() returns null, so if not null it adds the locally stored task to textarea element
    if (prevTask != null) {
      task.text(prevTask);
    } else {
      task.text("");
    }
    // keyboard event for the textarea, if enter, shift, backspace is pressed they're not logged, otherwise it is added to the text of textarea element
    task.keyup(function (e) {
      if (e.keyCode == 13 || e.keyCode == 8 || e.keyCode == 16) {
        e.preventDefault();
        return false;
      }
      task.text(e.key);
    });
    //creates third col 1/6 of the container as button element with submit type because its in a form with class saveBtn
    var save = $("<button type = 'submit' >Save</button>").addClass(
      "col-2 saveBtn"
    );
    //on submit event to set the current value(text) in textarea to local storage with the key as the hour block
    contRow.on("submit", function (e) {
      e.preventDefault();
      var todo = task.val();
      localStorage.setItem(tm.time, todo);
    });
    // adds the rows to the element with container class
    containerEl.append(contRow);
    // adds the columns to the time block row
    contRow.append(hourly, task, save);
    // variable for current hour in military time
    var hourNow = moment().format("H");
    // conditional to compare current hour and hour block, then add background color class appropriately
    if (tm.milTime < hourNow) {
      task.addClass("past");
    } else if (tm.milTime > hourNow) {
      task.addClass("future");
    } else {
      task.addClass("present");
    }
  });
}
//function call for current time that calls displayTime function each second
setInterval(displayTime, 1000);
// calls createRow function on start up
createRow();
