<?php 
$errors = '';
$myemail = 'rstrease@windstream.net';
if(empty($_POST['email']))
{
    $errors .= "\n Error: all fields are required";
}
$email_address = $_POST['email']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
    header('Location: thanks.html');
}

if( empty($errors))
{
	$to = $myemail; 
	$email_subject = "Subscribe form submission FROM Clava: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Email: $email_address \n Message \n $message"; 
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	mail($to,$email_subject,$email_body,$headers);
} 
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>
