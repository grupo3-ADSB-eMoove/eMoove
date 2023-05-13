DROP DATABASE IF EXISTS emoove ;
CREATE DATABASE IF NOT EXISTS emoove ;
USE emoove;
-- drop database emoove;
-- CREATE DA TABELA DO ESTABELECIMENTO DO 
CREATE TABLE estabelecimento(
  idEstabelecimento INT PRIMARY KEY auto_increment,
  nomeFantasia VARCHAR(100),
  cnpj VARCHAR(18),
  area FLOAT,
  telefoneEstabelecimento VARCHAR(20),
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR (5) NOT NULL,
  bairro VARCHAR (200) NOT NULL,
  cep char(9)
);
-- CREATE DA TABELA DO USUARIO QUE VAI CONTRATAR
CREATE TABLE usuario(
  idUsuario INT,
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  permissao VARCHAR(25) CONSTRAINT chkPermissao CHECK (
    permissao in ('basico', 'intermediario', 'total')
  ),
  fkEstabelecimento INT,
  FOREIGN KEY (fkEstabelecimento) REFERENCES estabelecimento (idEstabelecimento),
  CONSTRAINT pkUsuario PRIMARY KEY (idUsuario, fkEstabelecimento)
);
-- CREATE DA TABELA ONDE VAI ARMAZENAR O LOCAL QUE O SENSOR FOI INSTALADO
CREATE TABLE localInstalado (
  idLocal INT PRIMARY KEY AUTO_INCREMENT,
  localInstalado varchar (10),
  fkEstabelecimento INT,
  FOREIGN KEY (fkEstabelecimento) REFERENCES estabelecimento (idEstabelecimento)
);
-- CREATE DA TABELA SENSOR ONDE GUARDA AS INFOS DO SENSOR
CREATE TABLE sensor(
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  dtInstalacao DATE not null,
  statusSensor VARCHAR(10),
  fkLocalInstalado INT,
  FOREIGN KEY (fkLocalInstalado) REFERENCES localInstalado(idLocal)
);
-- CREATE DA TABELA QUE VAI ARMAZENAR OS DADOS CAPTURADOS PELO SENSOR
CREATE TABLE capturaDados(
  dtHora DATETIME DEFAULT current_timestamp,
  fkSensor INT,
  FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
  constraint pkComposta PRIMARY KEY (dtHora, fkSensor),
  valor BOOLEAN
);