$(async function () {
    var validate = false;
    setCookie(null);
    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function (snapshot) {

        if (snapshot.val() == null) {
            firebase.database().ref("Data/PresenQ/").limitToFirst(1).once('value', function (snapshot) {
                console.log(snapshot.val().Q);
                document.getElementById('presenQ').innerHTML = snapshot.val().Q;
            });
        } else {
            document.getElementById('presenQ').innerHTML = Object.keys(snapshot.val())[0];
            document.getElementById('presenQ1').innerHTML = Object.keys(snapshot.val())[0];
            let checkQ = getCookie("Q");
            if (checkQ != "") {
                console.log(checkQ);
                document.getElementById('wait1').innerHTML = checkQ - Object.keys(snapshot.val())[0];
                // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
            } else {

            }

        }
        let checkQ = getCookie("Q");

        if (snapshot.val() != null && snapshot.val() != "") {
            if (checkQ == Object.keys(snapshot.val())[0]) {
                var mydate = new Date();
                //  mydate.setTime(mydate.getTime() + 4800 * 1000);
                mydate.setTime(mydate.getTime() + 1000 * (60 * 3));
                document.cookie = `Q=${checkQ}; expires=${mydate.toUTCString()}`;
                timeOut(checkQ);
            }

            if (checkQ < Object.keys(snapshot.val())[0] && checkQ != "") {
                console.log("XXX");
                document.cookie = "Q=null; expires=Thu, 18 Dec 2013 12:00:00 UTC";
                // refash ************
                location.reload(true);
                //http://192.168.1.110/ubon/Ubon-light-interactive/i.html#
            }
        }

    })

    let checkQ = getCookie("Q");
    if (checkQ != "") {
        // $(".start").addClass('animate__animated', 'animate__fadeOut');
        const element = document.querySelector('.PAGEONE');
        element.classList.add('animate__animated', 'animate__fadeOut');

        element.style.display = "none";
        const element2 = document.querySelector('.PAGETWO');
        element2.style.display = "inline";
        var content = element2.innerHTML;
        element2.innerHTML = content;

        // element2.classList.add('animate__animated', 'animate__fadeInUp');

    }


    firebase.database().ref("Data/Q/").on('value', async function (snapshot) {
        console.log(snapshot.numChildren());
        document.getElementById('wait').innerHTML = await snapshot.numChildren();
        // document.getElementById('wait1').innerHTML = Object.keys(snapshot.val())[0]-x+1;
    });




    // firebase.database().ref("Data/PresenQ/").limitToLast(1).on('value', function(snapshot){
    //     let checkQ = getCookie("Q");
    //     if(checkQ <  snapshot.val().Q)
    //     {
    //         console.log("XXXX");
    //         var mydate = new Date();
    //         mydate.setTime(mydate.getTime() - 4800 * 2000);
    //        document.cookie = "Q=null; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    //        // refash ************
    //     }
    // });

});


async function insertQ() {



    this.validate = true;

    var result = await this.validateQ().then(function (params) {
        return params
    });
    let count = parseInt(result) + 1;

    this.setCookie(count);

    await firebase.database().ref("Data/Q/" + parseInt(count)).set({
        "TimeStart": "X",
        "TimeEnd": "A"

    });
    await firebase.database().ref("Data/AllQ/Q/").set(
        parseInt(count)
    );
    await firebase.database().ref("Data/PresenQ/Q/").set(
        parseInt(count)
    );


    firebase.database().ref("Data/Q/").limitToFirst(1).once('value', function (snapshot) {
        let checkQ = getCookie("Q");
        if (checkQ != "") {
            console.log(checkQ);
            document.getElementById('wait1').innerHTML = checkQ - Object.keys(snapshot.val())[0];
            // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
        } else {

        }
    });
}

async function validateQ() {
    return new Promise(async (resolve, reject) => {
        await firebase.database().ref("Data/AllQ/Q").once('value', async function (snapshot) {
            if (snapshot.val() == null) {
                resolve(0);
                return
            }
            Q = await snapshot.val();
            resolve(Q);
            return
        });

    });
}

async function setCookie(count) {
    if (count == null) {
        var qcookie = this.getCookie("Q");
        document.getElementById('yourQ').innerHTML = qcookie;

        return
    }
    var mydate = new Date();
    //  mydate.setTime(mydate.getTime() + 4800 * 1000);
    mydate.setTime(mydate.getTime() + 4800 * 1000);
    document.cookie = `Q=${count}; expires=${mydate.toUTCString()}`;
    console.log(count);
    var qcookie = this.getCookie("Q");
    document.getElementById('yourQ').innerHTML = qcookie;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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


async function timeOut(Q) {
    var exp;
    var x = setInterval(async function () {

        exp = getCookie("Q")
        console.log(exp);
        if (exp == "") {
            clearInterval(x);
            document.cookie = "Q=null; expires=Thu, 18 Dec 2013 12:00:00 UTC";
            firebase.database().ref("Data/Q/" + Q).remove();
            // refash ************
            location.reload(true);
        }
    }, 1000);

}

function setcolor(room)
{
    console.log(room);
}