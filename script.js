$(document).ready(function () {
   // Function to update the current day and time blocks
   function updateCalendar() {
      var currentDay = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDay);

      var currentTime = dayjs().hour();
      $(".time-block").each(function () {
         var blockHour = parseInt($(this).attr("data-hour"));

         // Update the classes based on past, present, or future
         if (blockHour < currentTime) {
            $(this).removeClass("present future").addClass("past");
         } else if (blockHour === currentTime) {
            $(this).removeClass("past future").addClass("present");
         } else {
            $(this).removeClass("past present").addClass("future");
         }
      });
   }

   // Function to load events from local storage
   function loadEvents() {
      $(".time-block").each(function () {
         var blockHour = $(this).attr("data-hour");
         var eventText = localStorage.getItem(blockHour);
         $(this).find("textarea").val(eventText);
      });
   }

   // Function to save events to local storage
   function saveEvent(hour, text) {
      localStorage.setItem(hour, text);
   }

   // Render the calendar on page load
   function renderCalendar() {
      for (var hour = 9; hour <= 23; hour++) {
         var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);
         var hourCol = $("<div>").addClass("col-md-1 hour").text(dayjs().hour(hour).format(" hA"));
         var textCol = $("<div>").addClass("col-md-10 description");
         var eventTextarea = $("<textarea>").attr("placeholder", "Enter your event here");
         var saveCol = $("<div>").addClass("col-md-1 saveBtn").html("<i class='fas fa-save'></i>");

         textCol.append(eventTextarea);
         timeBlock.append(hourCol, textCol, saveCol);
         $(".container").append(timeBlock);
      }
   }

   // Event listener for the save button click
   $(".container").on("click", ".saveBtn", function () {
      var hour = $(this).parent().attr("data-hour");
      var text = $(this).siblings(".description").find("textarea").val();
      saveEvent(hour, text);
   });

   renderCalendar();
   updateCalendar();
   loadEvents();

   // Update the calendar every minute
   setInterval(function () {
      updateCalendar();
   }, 60000);
});
