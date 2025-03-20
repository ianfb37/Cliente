<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conectar a la base de datos
$host = 'localhost';
$db = 'controldiabetes';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el mes y el año desde la consulta
$month = isset($_GET['month']) ? intval($_GET['month']) : date('m');
$year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');

// Consultar los datos del valor LENTA
$sql = "SELECT lenta FROM controlglucosa WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $month, $year);
$stmt->execute();
$result = $stmt->get_result();

$lenta_values = [];
while ($row = $result->fetch_assoc()) {
    $lenta_values[] = $row['lenta'];
}

$stmt->close();
$conn->close();

// Calcular estadísticas
if (count($lenta_values) > 0) {
    $mean = array_sum($lenta_values) / count($lenta_values);
    $min = min($lenta_values);
    $max = max($lenta_values);
    $response = [
        'mean' => $mean,
        'min' => $min,
        'max' => $max,
        'values' => $lenta_values
    ];
} else {
    $response = [
        'mean' => null,
        'min' => null,
        'max' => null,
        'values' => []
    ];
}

echo json_encode($response);
?>
