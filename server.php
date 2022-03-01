<?
$_POST = json_decode(file_get_contents("php://input"), true); //нужно для отправки данных в JSON формате
echo var_dump($_POST);