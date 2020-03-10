$(function(){
   // https://codepen.io/iskander-bakirov/pen/XWrvRKG
   /* :: DATE PICKER------------------------------------------------ */

   // :: DAY
   var $select_day = $("#select_day");
   for(var i = 1; i < 32; i++) {
   var day_number = i;
   $('<option>')
       .val(('0' + day_number).slice(-2))   // set the value
       .text(i)    // set the text in in the <option>
       .appendTo($select_day);
   }

   // :: MONTH
   var $select_month = $("#select_month");
   var options = ["01","02","03","04","05","06", "07","08","09","10","11","12"];
   for(var i = 0; i < options.length; i++) {
   var month_number = i + 1;
   $('<option>')
       .val(('0' + month_number).slice(-2))          // set the value
       .text(options[i])    // set the text in in the <option>
       .appendTo($select_month);
   }


   // :: YEAR
   var year = new Date().getFullYear()
   console.log(year);
   var $select_year = $('#select_year').empty();


   for(var i = 0;  i < 11; i++) {
      console.log(i);
   $('<option>')
       .val(year + i)     // set the value
       .text(year + i)    // set the text in in the <option>
       .appendTo($select_year);
   }

   $('button').click(function(){
        var year = $("#select_year option:selected").val();
        var month = $("#select_month option:selected").val();
        var day = $("#select_day option:selected").val();


        var ddayDate = new Date(year, month, day);
        var startDay = new Date();

        console.log(ddayDate);
        console.log(startDay);
        
        if(month =='Month'){
            alert("'월' 선택해주세요")
        }else if(day =='Day'){
            alert("'일' 선택해주세요")
        }else{

       var dday={
           ddayDate:ddayDate,
           startDay:startDay,
       } 
       var ddays = getDdays()
       if(ddays === null){
           ddays = []
       }
        ddays.push(dday)
        setDdays(ddays);
        location.href="main.html";
       }
    })

    
})