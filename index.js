function copyToClip(obj) {
   var textArea = document.createElement( "textarea" );
   textArea.value = obj.parent().prev().text();
   document.body.appendChild( textArea );       
   textArea.select();

   try {
      var successful = document.execCommand( 'copy' );
	  obj.html('copyied!!!')
	  setTimeout( function(){ obj.html('copy')}, 1500 );
   } catch (err) {
	  obj.html('error')
	  setTimeout( function(){ obj.html('copy')}, 1500 );
   }    
   document.body.removeChild( textArea ); 
}
function AddData(obj){
   const pwd = $("#Password").val()
   const name = $("#name").val()
  if(pwd != '' && name != ''){

   $(".appendData").append( '<tr class="row100 body"><td class="cell100 column1">'+name+'</td><td class="cell100 column2">'+pwd+'</td><td class="cell100 column3"><button class="button-41" role="button"onclick="copyToClip($(this))">Copy</button> <a href="#" onclick="removeData($(this))" class="btn-delete">delete</a></td></tr>' );

   newData = {name:name,password:pwd}
   var storedData = localStorage.getItem("data");
   if(!storedData){
      var firstData = []
      localStorage.setItem("data",  JSON.stringify(firstData));
      storedData = JSON.parse(localStorage.getItem("data"));
   } else {
      storedData = JSON.parse(storedData)
   }

   storedData.push(newData)
   localStorage.setItem("data", JSON.stringify(storedData));
   $("#Password").val(null);
   $("#name").val(null);
  }
}
function removeData(obj){
   var sure = confirm("Are you sure?")
   if(sure){
      const password = obj.parent().prev().html();
      const name = obj.parent().prev().prev().html();
      obj.parent().parent().remove();
      var storedData = JSON.parse(localStorage.getItem("data"));
      if(storedData){
         storedData.forEach(function(item){
            if(item.name == name && item.password == password){
               storedData = storedData.filter(function(ele) {
                  return ele !== item
              })
            }
         });
         localStorage.setItem("data", JSON.stringify(storedData));
      }
   }
}


   var storedData = JSON.parse(localStorage.getItem("data"));
   if(storedData){
      storedData.forEach(function(item){
         $(".appendData").append( '<tr class="row100 body"><td class="cell100 column1">'+item.name+'</td><td class="cell100 column2">'+item.password+'</td><td class="cell100 column3"><button class="button-41" role="button"onclick="copyToClip($(this))">Copy</button> <a href="#" onclick="removeData($(this))" class="btn-delete">delete</a></td></tr>' );
      });
   }

   $('.Add-data').on('click',function(){
      $(".add-div").toggleClass('hide-div')
      $(".download-div").addClass('hide-div')
      $(".upload-div").addClass('hide-div')
   });
   
   $('.download').on('click',function(){
      var storedData = localStorage.getItem("data");
      $('.download-textarea').val(storedData); 
      $(".add-div").addClass('hide-div')
      $(".download-div").toggleClass('hide-div')
      $(".upload-div").addClass('hide-div')
   });
   
   $('.upload').on('click',function(){
      $(".upload-data-button").on('click',function(){
         var array = $(".upload-textarea").val();
         if(array != ''){
            localStorage.setItem("data",array);
            $(".upload-div").addClass('hide-div')
            array = JSON.parse(array);
            array.forEach(function(item){
               $(".appendData").append( '<tr class="row100 body"><td class="cell100 column1">'+item.name+'</td><td class="cell100 column2">'+item.password+'</td><td class="cell100 column3"><button class="button-41" role="button"onclick="copyToClip($(this))">Copy</button> <a href="#" onclick="removeData($(this))" class="btn-delete">delete</a></td></tr>' );
            });
         }
      });
      $(".add-div").addClass('hide-div')
      $(".download-div").addClass('hide-div')
      $(".upload-div").toggleClass('hide-div')
   });
  $(".clear-storage").on('click',function(){
   var sure = confirm('Are you sure?')
   if(sure){
      localStorage.removeItem('data');
      $(".appendData").hide()
   }
  });