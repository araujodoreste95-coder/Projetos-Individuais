<?php

$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if ($email === "jose982@gmail.com" && $senha === "12345678") {
    echo "<script>alert('Sucesso!.'); window.location.href = 'login.html';</script>";
    exit();
} else
    if ($email === "" || $senha === "") {
        // Redireciona para a página de login com uma mensagem de alerta
        echo "<script>alert('Por favor, preencha todos os campos.'); window.location.href = 'login.html';</script>";
    } else {
        echo "<script>alert('Email ou senha incorretos.'); window.location.href = 'login.html';</script>";
    }