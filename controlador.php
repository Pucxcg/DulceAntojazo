<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cantidad = $_POST['cantidad'];
    $precioShot = ($cantidad >= 10) ? 2500 : 3000;
    $total = $cantidad * $precioShot;

    echo "El costo total de $cantidad shots es: $total pesos.";
}

?>