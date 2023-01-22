<?php

class Database
{
    private $pdo;
    private $dbHost;
    private $dbName;
    private $dbUsername;
    private $dbPassword;

    public function __construct()
    {
        $this->dbHost = getenv('DB_HOST');
        $this->dbName = getenv('DB_NAME');
        $this->dbUsername = getenv('DB_USERNAME');
        $this->dbPassword = getenv('DB_PASSWORD');
        $this->pdo = new PDO (
            "mysql:host={$this->dbHost};dbname={$this->dbName};charset=utf8mb4",
            $this->dbUsername,
            $this->dbPassword,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
    }

    public function executeSql($sql, array $values = []): string
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($values);

        return $this->pdo->lastInsertId();
    }

    public function query($sql, array $criteria = [])
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($criteria);

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function queryOne($sql, array $criteria = [])
    {
        $query = $this->pdo->prepare($sql);

        $query->execute($criteria);

        return $query->fetch(PDO::FETCH_ASSOC);
    }
}
