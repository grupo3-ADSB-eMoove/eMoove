CREATE DATABASE emoove;
USE emoove;

drop database emoove;

-- CREATE DA TABELA DO USUARIO QUE VAI CONTRATAR
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
	senha VARCHAR(50) NOT NULL,
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento)
);


CREATE TABLE telefoneUsuario(
	idTelefone INT PRIMARY KEY AUTO_INCREMENT,
    celular VARCHAR(20) NOT NULL,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES Usuario (idUsuario)
);

-- CREATE DA TABELA DO ESTABELECIMENTO DO 
CREATE TABLE estabelecimento(
    idEstabelecimento INT PRIMARY KEY auto_increment,
    nomeEstabelecimento VARCHAR(100),
    logradouro VARCHAR(100) NOT NULL,
    numeroEndereco VARCHAR (5) NOT NULL,
    bairroEndereco VARCHAR (200) NOT NULL,
    cidadeEndereco VARCHAR (200) NOT NULL,
    cepEndereco char(9),
    cnpj char(14) 
);

CREATE TABLE telefoneEstabelecimento(
	idTelefone INT PRIMARY KEY AUTO_INCREMENT,
    telefoneAtendimento CHAR(10) NOT NULL,
    telefoneSAQ varCHAR(20),
    celular varCHAR(20),
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES Estabelecimento (idEstabelecimento)
);

-- CREATE DA TABELA SENSOR ONDE GUARDA AS INFOS DO SENSOR
CREATE TABLE Sensor(
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    dtInstalacao DATE not null,
    status VARCHAR(10),
    fk_local_instalado INT,
    FOREIGN KEY (fk_local_instalado) REFERENCES LocalInstalado(idLocal)
);

-- CREATE DA TABELA ONDE VAI ARMAZENAR O LOCAL QUE O SENSOR FOI INSTALADO
-- Possivelmente vai de comes
CREATE TABLE LocalInstalado (
    idLocal INT PRIMARY KEY AUTO_INCREMENT,
    LocalInstalado varchar (10),
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento)
);

CREATE TABLE Funcionario(
	idFuncionario INT ,
    nomeFuncionario VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    emailFuncionario VARCHAR(100) NOT NULL,
    cpf CHAR(14) NOT NULL,
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento),
    CONSTRAINT pkCompostaFuncionario PRIMARY KEY (idFuncionario, fk_estabelecimento)
);

-- CREATE DA TABELA QUE VAI ARMAZENAR OS DADOS CAPTURADOS PELO SENSOR
CREATE TABLE CapturaDados(
	dtHora  DATETIME DEFAULT current_timestamp,
    fk_sensor INT,
	FOREIGN KEY (fk_Sensor) REFERENCES Sensor(idSensor),
    constraint pkComposta PRIMARY KEY (dtHora, fk_sensor),
	valor BOOLEAN
);

-- INSERT TABELA USUARIO
INSERT INTO usuario values
	(null, 'Guilherme', 'Scarabelli', '55555555555', 'gui@gmail.com', '123', null, 1),
    (null, 'Vivian', 'Silva', '22222222222', 'vivian@gmail.com', '123', 'Funcionario', 1),
	(null, 'Leonardo', 'Bento', '44444444444', 'leo@gmail.com', '123', null,  2),
	(null, 'Renan', 'Santos', '33333333333', 'renan@gmail.com', '123',null, 3);
    
INSERT INTO  telefoneUsuario values
	(null, '11 91111-1111', 1),
	(null,  '11 92222-2222', 2),
	(null, '11 93333-3333', 3),
	(null, '11 94444-4444', 4);

-- INSERT TABELA 
INSERT INTO estabelecimento VALUES 
	(null,'MacLovinPadaria', 'Rua Irmão Deodoro', 659, 'Guaianases', 'São Paulo', '08410-410','11492439000103' ),
	(null,'MacRestaurante', 'Rua haddock lobo', 756, 'Paulista', 'São Paulo', '08410-410', '61050965000183'),
	(null,'Churrascaria do Renan', 'Rua Kuh xaixange', 78, 'Cidade Tiradentes', 'São Paulo', '08410-410', '62368641000150');
    
INSERT INTO  telefoneEstabelecimento values
	(null, '1122667842', null, '11911111111', 1),
	(null, '1122667842', null, '11922222222', 2),
	(null, '1124623485', null, '11933333333', 3);

-- Insert do local
INSERT INTO LocalInstalado VALUES
(null, 'Caixa', 1),
(null, 'Entrada', 1),
(null, 'Corredor', 1);

-- insert do sensor
INSERT INTO Sensor VALUES
(null, '2023-07-10', 'Ativo', 1),
(null, '2023-07-11', 'Ativo', 2),
(null, '2023-07-12', 'Ativo', 3);

select * from Sensor;
DESC CAPTURADADOS;
-- insert dos dados
INSERT INTO CapturaDados VALUES
('2023-10-20 11:00:00', 1, 1),
('2023-10-20 08:00:00', 1, 1),
('2023-10-20 11:00:00', 2, 1),
('2023-10-20 11:30:00', 2, 1),
('2023-10-20 11:00:00', 3, 1),
('2023-10-20 11:10:00', 2, 1);

-- Aqui está acontecendo um select mais "refinado", peguei para puxar apenas o id, valor da captura, o id do sensor
-- e o local em q ele foi instalado, eu fiz um join na tabela sensor e por la, eu pego o local em que o sensor foi instalado.

SELECT dtHora, valor, dtHora, idSensor, localInstalado, nomeestabelecimento FROM CapturaDados 
	JOIN Sensor
		ON CapturaDados.fk_sensor = Sensor.idSensor
			JOIN LocalInstalado ON sensor.fk_local_instalado = LocalInstalado.idLocal
				JOIN estabelecimento ON estabelecimento.idEstabelecimento = LocalInstalado.fk_estabelecimento;
            

-- AQUI TEMOS UM SELECT DOS USUARIOS, OS SEUS CARGOSOS E SEUS RESPECTIVOS ESTABELECIMENTOS 
SELECT nomeusuario as Usuario, ifnull(cargo_funcionario, 'Representante') as cargo, nomeEstabelecimento as Estabelecimento FROM Estabelecimento 
	JOIN Usuario ON usuario.fk_estabelecimento = estabelecimento.idEstabelecimento;
	

 


