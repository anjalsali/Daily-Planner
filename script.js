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

   updateCalendar();
   loadEvents();
   // Update the calendar every minute
   setInterval(function () {
      updateCalendar();
   }, 60000);
});
