// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

//global variable correlating to element with currentDay id
var displayTimeEl = $("#currentDay");
var containerEl = $(".container");
var Descr = $(".description");
var savebt = $(".saveBtn")
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
function createRow() {
    timeBlk.forEach(function(tm){
        var contRow = $("<form>").addClass("row time-block");
        var hourly = $("<div>").addClass("col-2 hour");;
        if(tm.milTime <12){
        hourly.text(tm.time + "am");
        }
        else{
            hourly.text(tm.time + "pm");
        }
        var task = $("<textarea>").addClass("col-8 description p-0");
        task.attr("name",tm.time);
        var prevTask = localStorage.getItem(tm.time);
        if(prevTask != null){
          task.text(prevTask);
        }
        else{
          task.text("");
        }

        task.keyup(function(e){
          if(e.keyCode ==13 || e.keyCode ==8){
            e.preventDefault();
            return false;
          }
          task.text(e.key);
        });
        var save = $("<button type = 'submit' >Save</button>").addClass("col-2 saveBtn");

        contRow.on("submit", function(e){
          e.preventDefault();
          var todo =task.val();
          localStorage.setItem(tm.time, todo);
        });

        containerEl.append(contRow);
        contRow.append(hourly, task, save);
        var hourNow = moment().format("H");
        if(tm.milTime <hourNow){
            task.addClass("past");
        }
        else if(tm.milTime > hourNow){
            task.addClass("future");
        }
        else{
            task.addClass("present");
        }
    });
}
//function call for time to call the displayTime function each second
setInterval(displayTime, 1000);
createRow();

