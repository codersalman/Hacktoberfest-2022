<?php
// Php With Mysql Registeration Page By Tobi Adeoye
?>
<div class="display-register">Fill the form to Register</div>
<?php
$shost = 'YOUR_SERVER_HOST_NAME_HERE';
$uname = 'YOUR_USERNAME_HERE';
$pword = 'YOUR_PASSWORD_HERE';
$dbase = 'YOUR_DATABASE_NAME_HERE';

function connect_to_mysqli($shost, $uname, $pword, $dbase){
	$connect = mysqli_connect($shost, $uname, $pword, $dbase);
	if (!$connect) {
		  die("The MySql Connection failed: " . mysqli_connect_error());
	}
	return $connect;	
}
if (isset($_POST['submit'])) {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';
$grab = connect_to_mysqli($shost, $uname, $pword, $dbase);
$error = array();
if (empty($name)) {
        $error = 'Error! Name is empty.'; }
    elseif (mb_strlen($name) < 2 || mb_strlen($name) > 21) {
        $error = 'Error! Check the lenght of your name.'; }
    if (preg_match('/[^\da-z\-\@\*\(\)\?\!\~\_\=\[\]]+/', $lat_nick)) {
        $error = 'Error! Text symbols not allowed on your name.';
}
if (empty($email)) {
        $error = 'Error! Email is empty.'; }
    elseif (mb_strlen($email) < 3 || mb_strlen($email) > 20) {
        $error = 'Error! Check the lenght of your email.'; }
    if (!is_email($email)) {
        $error = 'Error! This not a vaild email address.';
}	
	if (empty($password)) {
        $error = 'Error! Password is empty.'; }
    elseif (mb_strlen($password) < 5 || mb_strlen($password) > 21) {
    $error = 'Error! Check the lenght of your password';
}
if($error) {
?>
<div class="display-error"><h1>Warning!</h1>
<?php echo implode('<br/>',$error); ?> </div>
  <?php } else {
	$sql = "INSERT INTO data (name, email, password) VALUES ('$name', '$email', '$password')";
	if (mysqli_query($grab, $sql)) {
	?>	  <div class="display-password"><h2>Registeration Successful!</h2>Your name <?= $name ?> is now on our database.</div>
<?php
	} else {
		  echo 'Error: ' . $sql . '<br>' . mysqli_error($grab);
	}
	mysqli_close($grab);
}
  } 
?>
<form action="#password" method="post"><div class="display-form"> <p> 
     <h3>Name</h3>
     <input type="text" name="name" maxlength="30" value="<?= htmlspecialchars($email) ?>" /><br />
     <h3>Email</h3>
     <input type="text" name="email" maxlength="70" value="<?= htmlspecialchars($email) ?>" /><br />
     <h3>Password</h3>
     <textarea rows="3" name="password" type="password"><?= htmlspecialchars($password) ?></textarea><br />
     <input type="submit" name="Submit" value="Register"/></p></div></form>
