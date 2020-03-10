$(function(){
    
 
   //D-day 뿌리기 및 구하기
   var ddays=getDdays();

   if(ddays!=null){
      ddays.forEach(obj => {  
         var Dday = new Date(obj.ddayDate);    
         var now = new Date();  
         var gap = now.getTime() - Dday.getTime();   
         var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;  
         $('.dday-wrap').text('D-'+ result)
      })
   }

   // 수정일때 파라미터 어케할지 생각
   // $('.dday-wrap').click(function(){
   //    ddayId = $(this).
   //    location.href="ddays.html?ddayId="+ddayId;
   // })

     // 오늘 날짜 뿌리기-----------------------------------------------------
     var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
     var day = week[today.getDay()];
  
     if(dd<10) {
        dd='0'+dd
     } 
     if(mm<10) {
        mm='0'+mm
     } 
     today = yyyy + ' . ' + mm +' . '+ dd +' . ' + day;
    
     // console.log(today);
     $('.date-wrap').text(today)
     
      
     
  
     // todo input 팝업생성-----------------------------------------------------
     function date() {
        var date=new Date().toLocaleDateString();
        date=date.slice(0, -1);
        // var time=new Date().toLocaleTimeString();
        return date+' ';
     }
     $('.btn-add').click(function(){
        $('i.add').css('color','#b5bdc7')
        $('.add-popup').show()
     })
  
   //   $('.btn-in-add').click(function(){
   //      var todoId=date();
   //      console.log(todoId);
        
   //      var todoTitle=$('input').val();
  
   //      if (todoTitle == "") {
   //         alert('dddd')
   //      } else {
           
   //      }
   //   })

   // todo 저장

   $('.btn-in-add').click(function(){

     var todoTitle = $(this).parents('.popup-wrap').find('.todotext').val()
     var todocheck = $('.checkbox').text();
     console.log(todocheck);
     
     var todoTime = '00 : 00'
     var todoId =  todayIs();  
     if (todoTitle == "") {
         alert('todo를 작성해주세요')
      }

     var todo={
         todoTitle:todoTitle,
         todocheck:todocheck,
         todoTime:todoTime,
         todoId:todoId
     } 

     var todos = getTodos();
     if(todos === null){
         todos = []
     }
      todos.push(todo);
      setTodos(todos);

      $('.add-popup').hide()
      location.href="main.html";
   })

    // todo 뿌리기
//     function todoList(){
//       var todos = getTodos();
//       if(todos === null){
//          todos=[];
//       }
//       if(todos.length!=0){
//           $('.todo').empty();
//           todos.forEach(item => {
//                   $('.todo').prepend(`
//                   <li>
//                     <div class="todolist-content">
//                         <div class="todolist-left">
//                             <span class="todoTitle">${item.todoTitle}</span>   
//                             <label class="check">
//                                 <input type="checkbox" name="check">
//                                 <i class="material-icons checkbox">check_box_outline_blank</i>
//                             </label>
//                         </div>
//                         <div class="todolist-right">
//                             <div class="select-time"> 
//                             <span class="hour">${item.todoTime}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <span class="btn-bg btn-delete"><button class="material-icons">delete_outline</button></span>
//                     <span class="btn-bg btn-re"><button class="material-icons">create</button></span>
//                </li>
//                   `)                
//           });
//           touchEvent();
        
//       }}

//   todoList()


  // 체크박스(중복) =======================
  $('.check > .material-icons').click(function(){
   if($(this).text() == 'check_box_outline_blank'){
       $(this).prev().prop('checked', true)
       $(this).empty(); 
       $(this).text('check_box')
       console.log($('[name=check]:checked').val());
       
   }else{
       $(this).empty();
       $(this).text('check_box_outline_blank')
       console.log($('[name=check]:checked').val());
   }
  
})
   //clandar 중복 ==========================
   var $select_hour = $("#select-hour");
   for(var i = 1; i < 13; i++) {
   var day_number = i;
   $('<option>')
      .val(('0' + day_number).slice(-2))   
      .text(i)  
      .appendTo($select_hour);
   }

   var $select_time = $("#select-min");
   for(var i = 1; i < 60; i++) {
   var day_number = i;
   $('<option>')
      .val(('0' + day_number).slice(-2))  
      .text(i)   
      .appendTo($select_time);
   }

   $('.select-time').click(function(){
      $('.select-time').removeClass('active')
      // console.log('aaa');
   $('.select-time-popup').show()
   $(this).addClass('active')
   })
   $('.cancel').click(function(){
   $('.select-time-popup').hide()
   })

   $('.save').click(function(){
   // $('select').on("change", function(){
      
      var hour = $('#select-hour').val();
      var min = $('#select-min').val();
      console.log(hour);
      console.log(min);
      $('.select-time.active .hour').text(hour+' : '+min)
      //  $('.select-time.active .min').text(min)
      $('.select-time-popup').hide()
      // $('.select-time-popup').empty()
   });

   //  =================================================추가
    //달력 ===========================================================
    $("#calendar")
    .datepicker({  
        dateFormat: "yy/mm/dd",
        showOtherMonths: true,
        selectOtherMonths: false,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    })
    .swipe({
        swipeRight:function(){
            console.log('오른쪽');        
            $(this).find("[data-handler='prev']").click();
        },
        swipeLeft:function(){
            console.log('왼쪽');
            $(this).find("[data-handler='next']").click();
        }
    })
    
    // todo 스와이프================================================== 
    function touchEvent() {  
        $('.todolist-content').swipe({
            swipeRight:function(){
                $('.todolist li').removeClass('left right');   
                $(this).parent().addClass('right');      
                console.log('오른쪽');        
            },
            swipeLeft:function(){;  
                $('.todolist li').removeClass('left right');   
                $(this).parent().addClass('left');       
                console.log('왼쪽');   
            },
            swipeStatus:function(){;   
                $('.todolist li').removeClass('left right');              
            },

        })
    }
    
    touchEvent();

    // 체크박스
    $('.check > .material-icons').click(function(){
        if($(this).text() == 'check_box_outline_blank'){
            $(this).prev().prop('checked', true)
            $(this).empty(); 
            $(this).text('check_box')
            console.log($('[name=check]:checked').val());
            
        }else{
            $(this).empty();
            $(this).text('check_box_outline_blank')
            console.log($('[name=check]:checked').val());
        }
       
    })
    
    //select number
    
    var $select_hour = $("#select-hour");
    for(var i = 1; i < 13; i++) {
    var day_number = i;
    $('<option>')
        .val(('0' + day_number).slice(-2))   
        .text(i)  
        .appendTo($select_hour);
    }

    var $select_time = $("#select-min");
    for(var i = 1; i < 60; i++) {
    var day_number = i;
    $('<option>')
        .val(('0' + day_number).slice(-2))  
        .text(i)   
        .appendTo($select_time);
    }


    $('.select-time').click(function(){
       $('.select-time').removeClass('active')
         // console.log('aaa');
      $('.select-time-popup').show()
      $(this).addClass('active')
    })
    $('.cancel').click(function(){
      $('.select-time-popup').hide()
    })
    
   $('.save').click(function(){
      // $('select').on("change", function(){
        
         var hour = $('#select-hour').val();
         var min = $('#select-min').val();
         console.log(hour);
         console.log(min);
         $('.select-time.active .hour').text(hour+' : '+min)
        //  $('.select-time.active .min').text(min)
         $('.select-time-popup').hide()
         // $('.select-time-popup').empty()
      });

   // })

   // ==============================================================================추가
   // swiperight
   // swiperleft
   // 좌우 스와이프
   $('#red').bind('swiperight', function(event)
   {
   console.log('—-right');
   $.mobile.changePage('#green', {transition:'slide', reverse:true});
   });

   $('#green').bind('swiperleft', function(event)
   {
   console.log('—-left');
   $.mobile.changePage('#red', {transition:'slide'});
   });

   
    //달력 ===========================================================
    $("#calendar")
    .datepicker({   
        dateFormat: "yy/mm/dd",
        showOtherMonths: true,
        selectOtherMonths: false,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    })
    .swipe({
        swipeRight:function(){
            console.log('오른쪽');        
            $(this).find("[data-handler='prev']").click();
        },
        swipeLeft:function(){
            console.log('왼쪽');
            $(this).find("[data-handler='next']").click();
        }
    })
    // todo 스와이프================================================== 
    function touchEvent() {  
        $('.todolist-content').swipe({
            swipeRight:function(){
                $('.todolist li').removeClass('left right');   
                $(this).parent().addClass('right');      
                console.log('오른쪽');        
            },
            swipeLeft:function(){;  
                $('.todolist li').removeClass('left right');   
                $(this).parent().addClass('left');       
                console.log('왼쪽');   
            },
            swipeStatus:function(){;   
                $('.todolist li').removeClass('left right');              
            },

        })
    }
    
    touchEvent();

    // 체크박스
    $('.check > .material-icons').click(function(){
        if($(this).text() == 'check_box_outline_blank'){
            $(this).prev().prop('checked', true)
            $(this).empty(); 
            $(this).text('check_box')
            console.log($('[name=check]:checked').val());
            
        }else{
            $(this).empty();
            $(this).text('check_box_outline_blank')
            console.log($('[name=check]:checked').val());
        }
       
    })
    
    //select number
    
    var $select_hour = $("#select-hour");
    for(var i = 1; i < 13; i++) {
    var day_number = i;
    $('<option>')
        .val(('0' + day_number).slice(-2))   
        .text(i)  
        .appendTo($select_hour);
    }

    var $select_time = $("#select-min");
    for(var i = 1; i < 60; i++) {
    var day_number = i;
    $('<option>')
        .val(('0' + day_number).slice(-2))  
        .text(i)   
        .appendTo($select_time);
    }


    $('.select-time').click(function(){
       $('.select-time').removeClass('active')
         // console.log('aaa');
      $('.select-time-popup').show()
      $(this).addClass('active')
    })
    $('.cancel').click(function(){
      $('.select-time-popup').hide()
    })
    
   $('.save').click(function(){
      // $('select').on("change", function(){
        
         var hour = $('#select-hour').val();
         var min = $('#select-min').val();
         console.log(hour);
         console.log(min);
         $('.select-time.active .hour').text(hour+' : '+min)
        //  $('.select-time.active .min').text(min)
         $('.select-time-popup').hide()
         // $('.select-time-popup').empty()
      });
    
    //   height
    var height = $(window).innerHeight() - 445;
    $(".todo").css("height", height);


    //달력에 점+todo 뿌리기
    function todoList() {
        var todos = getTodos();
        if (todos === null) {
            todos = [];
        }
        if (todos.length === 0) {
          $(".todo").append(`
              <div class="no-todo">
                  <span>할일이 없습니다.</span>
              </div>
          `);
        } else {
          $(".todo").empty();
          todos.forEach(item => {
            var startdate=item.todoId
            console.log(startdate);
            
            // var startdate=el.startDate.split('/');
            $(".todo").append(`
            <li>
                <div class="todolist-content">
                    <div class="todolist-left">
                        <span class="todoTitle">${item.todoTitle}</span>   
                        <label class="check">
                            <input type="checkbox" name="check">
                            <i class="material-icons checkbox">check_box_outline_blank</i>
                        </label>
                    </div>
                    <div class="todolist-right">
                        <div class="select-time"> 
                        <span class="hour">${item.todoTime}</span>
                        </div>=
                    </div>
                </div>
                <span class="btn-bg btn-delete"><button class="material-icons">delete_outline</button></span>
                <span class="btn-bg btn-re"><button class="material-icons">create</button></span>
            </li>
            `);
            
            $('.ui-datepicker-calendar td:not(.ui-state-disabled)').each(function(){                
                var year=$(this).data('year');
                var month=$(this).data('month')+1;
                var date=$(this).find('a').text();
                if(month<10){
                    month = '0'+month
                }
                if(date<10){
                    date = '0'+date
                }

                // console.log(year);
                // console.log(month);
                if(startdate==year+month+date){          
                  $(this).append(`<span class="todo-dot "></span>`);
                }
            })
          });
        }
      }
      todoList();

      
    // $(document).on("click", ".schedule-text", function() {
    //     var activeSchedule = $(this).parents(".schedule").data("id");
    //     localStorage.setItem("activeSchedule", activeSchedule);
    // });

})