<!DOCTYPE html>
<html lang="en">
   <script>
        let count=setInterval(updated);
        let upto=0;
        function updated(){
            var count= document.getElementById("counter");
            count.innerHTML=upto++;
            if(upto===1000)
            {
                clearInterval(count);
            }
        }
    </script>
<body style="text-align:center">
    <p>AUTO-COUNTER</p>
    <div id="counter">
       
    </div>
</body>
</html>