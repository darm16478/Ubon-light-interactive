$(async function () {
    // firebase.database().ref("ControlButton/Like/Like1").on('value', function(snapshot){
    //  console.log(snapshot.value);
    // })
    await sleep(5000);
    location.href = "http://localhost/ubon/home.html";
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  