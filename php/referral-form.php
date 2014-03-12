<?php
session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

require 'php-mailer/class.phpmailer.php';

// Your email address
$to = 'rstrease@gmail.com';

$subject = "Customer Referral";

if($to) {

	$name = $_POST['rfname'];
	$email = $_POST['rfemail'];
	$phone = $_POST['rfphone'];
	$ref_name = $_POST['ref_name'];
	$ref_email = $_POST['ref_email'];
	$ref_phone = $_POST['ref_phone'];
	
	$fields = array(
		0 => array(
			'text' => 'Name',
			'val' => $_POST['rfname']
		),
		1 => array(
			'text' => 'Email address',
			'val' => $_POST['rfemail']
		),
		2 => array(
			'text' => 'Phone Number',
			'val' => $_POST['rfphone']
		),
		3 => array(
			'text' => 'Name of person being referred',
			'val' => $_POST['ref_name']
		),
		4 => array(
			'text' => 'Email address of person being referred',
			'val' => $_POST['ref_email']
		),
		5 => array(
			'text' => 'Phone number of person being referred',
			'val' => $_POST['ref_phone']
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
	$mail->FromName = $_POST['name'];
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
