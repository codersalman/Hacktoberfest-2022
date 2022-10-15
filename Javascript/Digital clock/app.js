
        function showtime() {
            let date = new Date();
            let dt = date.getMonth();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let session = "AM";
                console.log(dt)
            if(h==0){
                h =12; //12 hour format
            }

            if (h>12) {
                h=h-12;  // 12 hour format
                session = "PM"
            }
              // if condition for adding 0   
            
            if (h<10) {
                h= '0'+ h;
             }
            if (m<10) {        
                m = '0'+ m;
            }
            if (s<10) {
                s = '0' + s;
            }
            if(dt == 18){
                document.getElementById('write').innerHTML = "Happy Holi"
            }

            document.getElementById('Dclock').innerHTML = h + ":" + m + ":" + s + " " +session ;

            setTimeout(showtime,1000);
        }
        showtime();
    