<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first-name'];
    $last_name = $_POST['last-name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $message = $_POST['message'];

    $to = 'kyleingy@gmail.com';
    $subject = 'New Contact Form Submission';
    $body = "Name: $first_name $last_name\n";
    $body .= "Email: $email\n";
    $body .= "Company: $company\n\n";
    $body .= "Message:\n$message";

    if(mail($to, $subject, $body)) {
        echo 'Message sent successfully.';
    } else {
        echo 'Error: Unable to send message.';
    }
}
?>