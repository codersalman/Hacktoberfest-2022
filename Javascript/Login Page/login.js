// visibility of password

let passwordInput = document.getElementById('txtPassword'),
            toggle=document.getElementById('btnToggle'),
            icon=document.getElementById('eyeIcon');

            function togglePassword(){
                if(passwordInput.type==='password'){
                    passwordInput.type='text';
                    icon.classList.add("fa-solid fa-eye");
                }
                else{
                    passwordInput.type='password';
                    icon.classList.remove("fa-solid fa-eye");
                }
            }
            function checkInput(){

            }
            toggle.addEventListener('click',togglePassword, false);
            passwordInput.addEventListener('keyup',checkInput, false);