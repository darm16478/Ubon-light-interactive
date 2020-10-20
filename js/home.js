var Q;

$(async function () {
    setCookie(null);
    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function(snapshot){
        if (snapshot.val() == null ){
            document.getElementById('presenQ').innerHTML = '<p> คิวปัจจุบัน : '+0+'</p>';
        }else{
            document.getElementById('presenQ').innerHTML = '<p> คิวปัจจุบัน : '+Object.keys(snapshot.val())[0]+'</p>';
        }
        let checkQ = getCookie("Q");

        if(checkQ == Object.keys(snapshot.val())[0]){
            timeOut(checkQ);
        }
    })
    
    firebase.database().ref("Data/AllQ/Q/").on('value', function(snapshot){
        if (snapshot.val() == null ){
            document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+0+'</p>';
        }else{
            document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+snapshot.val()+'</p>';
        }
    })

    
})

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

   }
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
    document.cookie = `Q=${count}`
    var qcookie = this.getCookie("Q");
    document.getElementById('yourQ').innerHTML =`<p> ${qcookie}</p>`;
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

  function  timeOut(Q) {
     var count = 10;
     var x=   setInterval(function()
    { 
        count--;
       document.getElementById('time').innerHTML = '<p> เหลือเวลา : '+ count+'</p>';
        if(count == 0)
        {
            clearInterval(x);
            var mydate = new Date();
            mydate.setTime(mydate.getTime() - 1);
            document.cookie = "Q=null; expires=" + mydate.toGMTString(); 

            return
        }
    }, 1000);
    
  }