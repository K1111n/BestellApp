<?php
session_start();
$username = $_POST['username'] ?? '';
$password = $_POST['password']  ?? '';


if($username == 'test@email.de' && $password == 'testpassword') {
    $_SESSION['logged_in'] = true;
    header ("Location: member_area.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Fehler</title>
    <link rel="stylesheet" href="styles.css">    
</head>
<body style="display:flex;flex-direction:column;">
    <section class="card">
        <h2>False Username or Password</h2><br>
        <a href="index.html">Back to Login</a>
    </section>
</body>
</html>