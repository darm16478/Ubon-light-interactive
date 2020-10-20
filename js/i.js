$(async function () {
        setCookie(null);
    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function(snapshot){

        if (snapshot.val() == null ){
            firebase.database().ref("Data/PresenQ/").limitToFirst(1).once('value', function(snapshot){
                console.log(snapshot.val().Q);
                document.getElementById('presenQ').innerHTML = snapshot.val().Q;
            });
        }else{
            document.getElementById('presenQ').innerHTML = Object.keys(snapshot.val())[0];
            document.getElementById('presenQ1').innerHTML = Object.keys(snapshot.val())[0];
            let checkQ = getCookie("Q");
            if(checkQ != "")
            {
            console.log(checkQ);
             document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
             // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
            }else{
             
            }
          
        }
        let checkQ = getCookie("Q");
        
        if(snapshot.val() != null)
        {
            if(checkQ == Object.keys(snapshot.val())[0]){
                timeOut(checkQ);
            }
        }

    })

    let checkQ = getCookie("Q");
    if(checkQ != "")
    {
               // $(".start").addClass('animate__animated', 'animate__fadeOut');
    const element = document.querySelector('.PAGEONE');
    element.classList.add('animate__animated', 'animate__fadeOut');

        element.style.display = "none";
        const element2 = document.querySelector('.PAGETWO');
        element2.style.display = "inline";
        var content = element2.innerHTML;
        element2.innerHTML= content; 

        // element2.classList.add('animate__animated', 'animate__fadeInUp');

    }

    firebase.database().ref("Data/Q/").limitToFirst(1).on('value',async function(snapshot){
        document.getElementById('wait').innerHTML = 0; 
  
        if(snapshot.val() != undefined || snapshot.val()!=null){
            var x =await Object.keys(snapshot.val())[0];
            firebase.database().ref("Data/Q/").once('value',async function(snapshot){
                console.log("NUM" + snapshot.numChildren() + "    X "+x);
                document.getElementById('wait').innerHTML =await snapshot.numChildren();
                // document.getElementById('wait1').innerHTML = Object.keys(snapshot.val())[0]-x+1;
            });
            if (snapshot.val() == null ){
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+0+'</p>';
            }else{
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+snapshot.val()+'</p>';
            }
        }

    })
    firebase.database().ref("Data/Q/").limitToLast(1).on('value', function(snapshot){

    });

});


async function insertQ(){
  

    let conf=await confirm("คุณต้องการจองคิวหรือไม่ ? ");
    if(conf ==await true)
    {    
        
     var result =await  this.validateQ().then(function(params) {
                 return params
             });
     let count =parseInt(result)+1;
 
   this.setCookie(count);
 
      await  firebase.database().ref("Data/Q/"+parseInt(count)).set({
             "TimeStart" : "X",
             "TimeEnd":"A"
             
        });
     await  firebase.database().ref("Data/AllQ/Q/").set(
         parseInt(count)
    );
    await  firebase.database().ref("Data/PresenQ/Q/").set(
        parseInt(count)
   );
    }

    firebase.database().ref("Data/Q/").limitToFirst(1).once('value', function(snapshot){
        let checkQ = getCookie("Q");
        if(checkQ != "")
        {
            console.log(checkQ);
         document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
         // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
        }else{
         
        }
    });
 }
 
 async function validateQ() {
     return new Promise(async (resolve, reject) => {
         await firebase.database().ref("Data/AllQ/Q").once('value',async function(snapshot){
             if(snapshot.val() == null){
                 resolve(0);
                 return
             }
         Q =await snapshot.val(); 
         resolve(Q);
         return
        });
 
     });
 }
 
 async function setCookie(count) {
     if(count == null)
     {
         var qcookie = this.getCookie("Q");
         document.getElementById('yourQ').innerHTML = qcookie;
 
         return
     }
     var mydate = new Date();
     mydate.setTime(mydate.getTime() + 4800 * 1000);
     console.log(mydate)
     document.cookie = `Q=${count}; expires= ${mydate} `
     var qcookie = this.getCookie("Q");
     document.getElementById('yourQ').innerHTML =  qcookie;
 }
 
 function getCookie(cname) {
     var name = cname + "=";
     var decodedCookie = decodeURIComponent(document.cookie);
     var ca = decodedCookie.split(';');
     for(var i = 0; i <ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
     }
     return "";
   }
 
  async function  timeOut(Q) {
      var count = 30;

      var x=   setInterval(async function()
     { 
         count--;
         console.log(count);
        // document.getElementById('time').innerHTML = '<p> เหลือเวลา : '+ count+'</p>';
         if(count == 0)
         {
             console.log(count);
             clearInterval(x);
             var mydate = new Date();
             mydate.setTime(mydate.getTime() - 1);
             document.cookie = "Q=null; expires=" + mydate.toGMTString(); 
             firebase.database().ref("Data/Q/"+Q).remove();
            }
     }, 1000);
     
   }