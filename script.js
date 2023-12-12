$(document).ready(function () {
   // Function to update the current day and time blocks
   function updateCalendar() {
      var currentDay = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDay);
   }

   updateCalendar();

   // Update the calendar every minute
   setInterval(function () {
      updateCalendar();
   }, 60000);
});
