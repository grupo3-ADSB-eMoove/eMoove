CREATE DATABASE emoove;
USE emoove;

drop database emoove;

-- CREATE DA TABELA DO ESTABELECIMENTO DO 
CREATE TABLE estabelecimento(
    idEstabelecimento INT PRIMARY KEY auto_increment,
    nomeEstabelecimento VARCHAR(100),
	telefoneEstabelecimento VARCHAR(20) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numeroEndereco VARCHAR (5) NOT NULL,
    bairroEndereco VARCHAR (200) NOT NULL,
    cepEndereco char(9)
);

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


-- CREATE DA TABELA ONDE VAI ARMAZENAR O LOCAL QUE O SENSOR FOI INSTALADO
CREATE TABLE LocalInstalado (
    idLocal INT PRIMARY KEY AUTO_INCREMENT,
    LocalInstalado varchar (10),
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento)
);

-- CREATE DA TABELA SENSOR ONDE GUARDA AS INFOS DO SENSOR
CREATE TABLE Sensor(
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    dtInstalacao DATE not null,
    statusSensor VARCHAR(10),
    fk_local_instalado INT,
    FOREIGN KEY (fk_local_instalado) REFERENCES LocalInstalado(idLocal)
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


-- INSERT TABELA ESTABELECIMENTO
desc estabelecimento;
INSERT INTO estabelecimento VALUES 
	(null,'MacLovinPadaria','119617074234' ,'Rua Irmão Deodoro', 659, 'Guaianases',  '08410-410' ),
	(null,'MacRestaurante', '119617074234','Rua haddock lobo', 756, 'Paulista', '08410-410'),
	(null,'Churrascaria do Renan', '119617074234','Rua Valdivia Jackson', 78, 'Cidade Tiradentes',  '08410-410'),
	(null,'Bancaria de dados da vivian','119617074234' ,'Rua banco de dados', 93, 'Av Paulista',  '08410-410');

-- INSERT TABELA USUARIO
desc usuario;
INSERT INTO usuario values
	(null, 'Guilherme', 'Scarabelli', 'gui@gmail.com', '123', 1),
    (null, 'Vivian', 'Silva', 'vivian@gmail.com', '123',  4),
	(null, 'Leonardo', 'Bento', 'leo@gmail.com', '123',  2),
	(null, 'Renan', 'Santos', 'renan@gmail.com', '123', 3);


-- Insert do local
INSERT INTO LocalInstalado VALUES
(null, 'Entrada1', 1),
(null, 'Corredor1', 1),
(null, 'Entrada1', 2),
(null, 'Corredor1', 2);

-- insert do sensor
desc sensor;
INSERT INTO Sensor VALUES
(null, '2023-07-10', 'Ativo', 1),
(null, '2023-07-11', 'Ativo', 2),
(null, '2023-07-12', 'Ativo', 3);

desc funcionario;
INSERT INTO funcionario VALUES 
(1, 'David', 'Silva', 'davidSilva@davidsilva.david','54743864217',1),
(1, 'Leonardo', 'Silva', 'leoSilva@leo.com','54312312217',2),
(2, 'Guilherme', 'Silva', 'mclovin@gmail.com','31274328617',1);


-- insert dos dados
DESC CAPTURADADOS;
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
SELECT nomeusuario as Contratante, nomeEstabelecimento as Estabelecimento FROM Estabelecimento 
	JOIN Usuario ON usuario.fk_estabelecimento = estabelecimento.idEstabelecimento;
    
    
	

 


