<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: index.html');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Member Area</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <section class="card">
        <h1>Member Area</h1>
        <p>Welcome to the Member Area!</p>
    </section>
</body>
</html>