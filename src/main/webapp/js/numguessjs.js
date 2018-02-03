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

        par.innerHTML = '<img width="239" height="286" src="' + givenValue+'.jpg' + '" />';


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
                         document.getElementById("serverResponse").innerHTML = "Nu, nu e bine! Incearca mai la dreapta!";
                     else if (keyHint == "lower")
                         document.getElementById("serverResponse").innerHTML = "Nu, nu e bine! Incearca mai la stanga!";
                 }
                 else
                 if(keySuccess=="true")
                 {
                     document.getElementById("serverResponse").innerHTML = "Felicitare, acum sti cine este cel mai prost jucator de la FCSB ! " + document.getElementById("number").value + " Dupa " + keyNrGuesses + " incercari.";
                 }
             }
         }