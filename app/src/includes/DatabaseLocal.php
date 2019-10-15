<?php

// Création d'une classe Database avec ses méthodes pour paramétrer et préparer les requêtes SQL
class DatabaseLocal
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = new PDO (
            'mysql:host=localhost;dbname=eightsins;charset=utf8mb4',
            'root',
            'root',
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }

    public function executeSql($sql, array $values = array())
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($values);

        return $this->pdo->lastInsertId();
    }

    public function query($sql, array $criteria = array())
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($criteria);

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function queryOne($sql, array $criteria = array())
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($criteria);

        return $query->fetch(PDO::FETCH_ASSOC);
    }
}