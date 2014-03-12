<?php
session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

require 'php-mailer/class.phpmailer.php';

// Your email address
$to = 'rstrease@gmail.com';

$subject = "Free Estimate Request";

if($to) {

	$fname = $_POST['first_name'];
	$lname = $_POST['last_name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$zip = $_POST['zipcode'];
	$company = $_POST['company'];
	$agent = $_POST['agent'];
	$message = $_POST['message'];
	
	$fields = array(
		0 => array(
			'text' => 'First Name',
			'val' => $_POST['fname']
		),
		1 => array(
			'text' => 'Last Name',
			'val' => $_POST['lname']
		),
		2 => array(
			'text' => 'Email address',
			'val' => $_POST['email']
		),
		3 => array(
			'text' => 'Phone Number',
			'val' => $_POST['phone']
		),
		4 => array(
			'text' => 'Address',
			'val' => $_POST['address']
		),
		5 => array(
			'text' => 'City',
			'val' => $_POST['city']
		),
		6 => array(
			'text' => 'State',
			'val' => $_POST['state']
		),
		7 => array(
			'text' => 'Zip Code',
			'val' => $_POST['zipcode']
		),
		8 => array(
			'text' => 'Insurance Company',
			'val' => $_POST['company']
		),
		8 => array(
			'text' => 'Insurance Agent',
			'val' => $_POST['agent']
		),
		10 => array(
			'text' => 'Message',
			'val' => $_POST['message']
		)
	);
	
	$message = "";
	
	foreach($fields as $field) {
		$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
	}
	
	$mail = new PHPMailer;

	$mail->IsSMTP();                                      // Set mailer to use SMTP
	
	// Optional Settings
	//$mail->Host = 'mail.yourserver.com';				  // Specify main and backup server
	//$mail->SMTPAuth = true;                             // Enable SMTP authentication
	//$mail->Username = 'username';             		  // SMTP username
	//$mail->Password = 'secret';                         // SMTP password
	//$mail->SMTPSecure = 'tls';                          // Enable encryption, 'ssl' also accepted

	$mail->From = $email;
	$mail->FromName = $_POST['fname'], $_POST['lname'];
	$mail->AddAddress($to);								  // Add a recipient
	$mail->AddReplyTo($email, $name);

	$mail->IsHTML(true);                                  // Set email format to HTML
	
	$mail->CharSet = 'UTF-8';

	$mail->Subject = $subject;
	$mail->Body    = $message;

	if(!$mail->Send()) {
	   $arrResult = array ('response'=>'error');
	}

	$arrResult = array ('response'=>'success');

	echo json_encode($arrResult);
	
} else {

	$arrResult = array ('response'=>'error');
	echo json_encode($arrResult);

}
?>
