CREATE DATABASE emoove;
USE emoove;
-- drop database emoove;
-- CREATE DA TABELA DO ESTABELECIMENTO DO 
CREATE TABLE estabelecimento(
  idEstabelecimento INT PRIMARY KEY auto_increment,
  nomeEstabelecimento VARCHAR(100),
  cnpj VARCHAR(18),
  area FLOAT,
  telefoneEstabelecimento VARCHAR(20) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numeroEndereco VARCHAR (5) NOT NULL,
  bairroEndereco VARCHAR (200) NOT NULL,
  cepEndereco char(9)
);
-- CREATE DA TABELA DO USUARIO QUE VAI CONTRATAR
CREATE TABLE usuario(
  idUsuario INT,
  nomeUsuario VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  permissao VARCHAR(25) NOT NULL CONSTRAINT chkPermissao CHECK (
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
-- INSERT TABELA ESTABELECIMENTO
desc estabelecimento;
INSERT INTO estabelecimento
VALUES (
    null,
    'MacLovinPadaria',
    '24.616.269/0001-65',
    92,
    '119617074234',
    'Rua Irmão Deodoro',
    659,
    'Guaianases',
    '08410-410'
  ),
  (
    null,
    'MacRestaurante',
    '24.616.269/0001-65',
    52,
    '119617074234',
    'Rua haddock lobo',
    756,
    'Paulista',
    '08410-410'
  ),
  (
    null,
    'Churrascaria do Renan',
    '24.616.269/0001-65',
    200.20,
    '119617074234',
    'Rua Valdivia Jackson',
    78,
    'Cidade Tiradentes',
    '08410-410'
  ),
  (
    null,
    'Bancaria de dados da vivian',
    '24.616.269/0001-65',
    172.89,
    '119617074234',
    'Rua banco de dados',
    93,
    'Av Paulista',
    '08410-410'
  );
-- INSERT TABELA USUARIO
desc usuario;
INSERT INTO usuario
values (
    1,
    'Guilherme',
    'Scarabelli',
    'gui@gmail.com',
    '123',
    'basico',
    1
  ),
  (
    1,
    'Vivian',
    'Silva',
    'vivian@gmail.com',
    '123',
    'basico',
    4
  ),
  (
    1,
    'Leonardo',
    'Bento',
    'leo@gmail.com',
    '123',
    'basico',
    2
  ),
  (
    1,
    'Renan',
    'Santos',
    'renan@gmail.com',
    '123',
    'basico',
    3
  );
-- Insert do local
INSERT INTO localInstalado
VALUES (null, 'Entrada1', 1),
  (null, 'Corredor1', 1),
  (null, 'Entrada1', 2),
  (null, 'Corredor1', 2);
-- insert do sensor
desc sensor;
INSERT INTO sensor
VALUES (null, '2023-07-10', 'Ativo', 1),
  (null, '2023-07-11', 'Ativo', 2),
  (null, '2023-07-12', 'Ativo', 3);
-- insert dos dados
DESC capturaDados;
INSERT INTO capturaDados
VALUES ('2023-10-20 11:00:00', 1, 1),
  ('2023-10-20 08:00:00', 1, 1),
  ('2023-10-20 11:00:00', 2, 1),
  ('2023-10-20 11:30:00', 2, 1),
  ('2023-10-20 11:00:00', 3, 1),
  ('2023-10-20 11:10:00', 2, 1);
-- Aqui está acontecendo um select mais "refinado", peguei para puxar apenas o id, valor da captura, o id do sensor
-- e o local em q ele foi instalado, eu fiz um join na tabela sensor e por la, eu pego o local em que o sensor foi instalado.
SELECT dtHora,
  valor,
  dtHora,
  idSensor,
  localInstalado,
  nomeestabelecimento
FROM capturaDados
  JOIN sensor ON capturaDados.fkSensor = sensor.idSensor
  JOIN localInstalado ON sensor.fkLocalInstalado = localInstalado.idLocal
  JOIN estabelecimento ON estabelecimento.idEstabelecimento = localInstalado.fkEstabelecimento;
-- AQUI TEMOS UM SELECT DOS USUARIOS, OS SEUS CARGOSOS E SEUS RESPECTIVOS ESTABELECIMENTOS 
SELECT nomeusuario as Contratante,
  nomeEstabelecimento as Estabelecimento
FROM Estabelecimento
  JOIN Usuario ON usuario.fkEstabelecimento = estabelecimento.idEstabelecimento;
select *
from estabelecimento;