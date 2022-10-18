// visibility of password

let passwordInput1 = document.getElementById('txtPassword1'),
            toggle1=document.getElementById('btnToggle1'),
            icon1=document.getElementById('eyeIcon1');

            function togglePassword1(){
                if(passwordInput1.type==='password'){
                    passwordInput1.type='text';
                    icon1.classList.add("fa-solid fa-eye");
                }
                else{
                    passwordInput1.type='password';
                    icon1.classList.remove("fa-solid fa-eye");
                }
            }
            function checkInput1(){
            }
            toggle1.addEventListener('click',togglePassword1, false);
            passwordInput1.addEventListener('keyup',checkInput1, false);
