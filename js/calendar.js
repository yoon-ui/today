$(function(){

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

  });