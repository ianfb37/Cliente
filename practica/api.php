<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas

$servername = "localhost";
$username = "root"; // Por defecto en XAMPP
$password = "";     // Sin contraseña por defecto
$dbname = "controldiabetes";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Manejar la solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $username = $data['username'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash de la contraseña
    $name = $data['name'];
    $surname = $data['surname'];
    $birthDate = $data['birthDate'];

    $sql = "INSERT INTO usuario (username, password, nombre, apellido, FechaNac) VALUES ('$username', '$password', '$name', '$surname', '$birthDate')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["id" => $conn->insert_id, "username" => $username, "name" => $name, "surname" => $surname, "birthDate" => $birthDate]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
