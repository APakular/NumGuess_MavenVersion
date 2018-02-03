       function reset(){
            document.getElementById("serverResponse").innerText="";
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestRestartGame=1";
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function guess(){
             xmlHttp = new XMLHttpRequest();
             xmlHttp.onreadystatechange=callback;
             var url ="NumGenServlet"+"?requestGuessNumber="+document.getElementById("number").value;
             xmlHttp.open("GET",url,true);
             xmlHttp.send();
         }

        function guessLink(givenValue) {

          //  document.getElementById("picturecontent").
                 var par = document.getElementById("picturecontent");
            // var img = document.createElement('img');
            // img.src = givenValue+'.jpg';
            // par.appendChild(img);

        par.innerHTML = '<img width="139" height="186" src="' + givenValue+'.jpg' + '" />';


            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestGuessNumber="+givenValue;
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function callback() {
             if(xmlHttp.readyState==4 && xmlHttp.status==200) {
                 var jSonMessage = JSON.parse(xmlHttp.responseText);
                 var keyRestartGame=jSonMessage.keyRestartGame;
                 if (keyRestartGame != undefined && keyRestartGame.length > 0) {
                     alert("Restart cu succes, jocul a reinceput!");
                     document.getElementById("number").value="";
                     return;
                 }

                 var keyError = jSonMessage.keyError;
                 if (keyError != undefined && keyError.length > 0) {
                     alert("Trebuie sa introduceti un numar valid!");
                     return;
                 }
                var keySuccess = jSonMessage.keySuccess;
                 var keyHint = jSonMessage.keyHint;
                 var keyNrGuesses = jSonMessage.keyNrGuesses;

                 if(keySuccess=="false") {
                     if (keyHint == "higher")
                         document.getElementById("serverResponse").innerHTML = "WRONG, Try a Higher one!";
                     else if (keyHint == "lower")
                         document.getElementById("serverResponse").innerHTML = "WRONG, Try a Lower one!";
                 }
                 else
                 if(keySuccess=="true")
                 {
                     document.getElementById("serverResponse").innerHTML = "Congrats, you guessed the number " + document.getElementById("number").value + " after " + keyNrGuesses + " guesses.";
                 }
             }
         }