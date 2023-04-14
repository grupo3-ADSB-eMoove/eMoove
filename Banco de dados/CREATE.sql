CREATE DATABASE emoove;

USE emoove;

-- CREATE DA TABELA DO USUARIO QUE VAI CONTRATAR
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    cpf CHAR(14),
    email VARCHAR(100) NOT NULL,
	senha VARCHAR(50) NOT NULL,
	telefone CHAR(12)
);

-- CREATE DA TABELA DO ESTABELECIMENTO DO 
CREATE TABLE estabelecimento(
    idEstabelecimento INT PRIMARY KEY auto_increment,
    nome VARCHAR(100),
    logradouro VARCHAR(100) not null,
    numeroEndereco VARCHAR (5) NOT NULL,
    bairroEndereco VARCHAR (200) not null,
    cidadeEndereco VARCHAR (200) NOT NULL,
    cepEndereco char(9),
    telefone VARCHAR(14),
	fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES Usuario (idUsuario)
);

-- INSERT TABELA USUARIO
INSERT INTO usuario values
(null, 'Guilherme', 'Scarabelli', '55555555555', 'gui@gmail.com', '123', '1111111111'),
(null, 'Leonardo', 'Bento', '44444444444', 'leo@gmail.com', '123', '2222222222'),
(null, 'Renan', 'Santos', '33333333333', 'renan@gmail.com', '123', '3333333333');

-- INSERT TABELA 
INSERT INTO estabelecimento VALUES 
(null,'MacLovinPadaria', 'Rua Irmão Deodoro', 659, 'Guaianases', 'São Paulo', '08410-410', '11 25522861', 1),
(null,'MacRestaurante', 'Rua haddock lobo', 756, 'Paulista', 'São Paulo', '08410-410', '11 25522861', 1),
(null,'Leo do hortifruti', 'Rua Timboco Fumo', 11, 'Sacomã', 'São Paulo', '08410-410', '11 27687798', 2),
(null,'Churrascaria do Renan', 'Rua Kuh xaixange', 78, 'Cidade Tiradentes', 'São Paulo', '08410-410', '11 20028922', 3);


-- SELECT APENAS DO NOME DO ESTABELECIMENTO E DO USUARIO QUE É DONO
SELECT estabelecimento.nome, usuario.nome FROM Estabelecimento JOIN Usuario
	ON Estabelecimento.fk_usuario = usuario.idUsuario;

-- CREATE DA TABELA CONTRATO, GUARDA OS DADOS DA CONTRATAÇÃO
CREATE TABLE contrato(
	idContrato INT PRIMARY KEY AUTO_INCREMENT,
    inicio date not null,
    fim date not null,
	 fk_estabelecimento INT, 
     FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento)
); 

-- INSERT NA TABELA CONTRATO
INSERT INTO contrato (inicio, fim, fk_estabelecimento)VALUES 
('2022-04-05', '2024-04-05', 1),
('2022-04-05', '2028-04-05', 2),
('2022-04-05', '2032-04-05', 3);

-- Aqui é um select "bruto" onde mostra todos os dados puxados por dois
-- joins, sendo que um é puxando os dados da tabela usuario e os dados do estabelecimento sendo puxado pelo fk_usuario

SELECT * FROM contrato
	JOIN estabelecimento
		on contrato.fk_estabelecimento = estabelecimento.idestabelecimento
			join Usuario on Estabelecimento.fk_usuario = Usuario.idUsuario;


-- CREATE DA TABELA SENSOR ONDE GUARDA AS INFOS DO SENSOR
CREATE TABLE sensor(
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
    LocalInstalado VARCHAR (10),
    fk_estabelecimento INT,
    FOREIGN KEY (fk_estabelecimento) REFERENCES estabelecimento (idEstabelecimento)
);

-- CREATE DA TABELA QUE VAI ARMAZENAR OS DADOS CAPTURADOS PELO SENSOR
CREATE TABLE capturaDados(
	idCaptura INT PRIMARY KEY AUTO_INCREMENT,
	valor BOOLEAN,   
	dtHora  DATETIME DEFAULT current_timestamp,
	fk_sensor INT,
	FOREIGN KEY (fk_sensor) REFERENCES Sensor(idSensor)
);

-- Insert do local
INSERT INTO LocalInstalado VALUES
(null, 'Caixa'),
(null, 'Entrada'),
(null, 'Corredor');

-- insert do sensor
INSERT INTO Sensor VALUES
(null, '2023-07-10', 'Ativo', 1),
(null, '2023-07-11', 'Ativo', 2),
(null, '2023-07-12', 'Ativo', 3);

select * from Sensor;

-- insert dos dados
INSERT INTO CapturaDados VALUES
(NULL, 1, '2023-10-20 08:00:00', 1),
(NULL, 1, '2023-10-20 08:00:00', 2),
(NULL, 1, '2023-10-20 08:00:00', 3);

-- Aqui está acontecendo um select mais "refinado", peguei para puxar apenas o id, valor da captura, o id do sensor
-- e o local em q ele foi instalado, eu fiz um join na tabela sensor e por la, eu pego o local em que o sensor foi instalado.


SELECT idCaptura, valor, dtHora, idSensor, localInstalado FROM CapturaDados 
	JOIN Sensor
		ON CapturaDados.fk_sensor = Sensor.idSensor
			JOIN LocalInstalado ON sensor.fk_local_instalado = LocalInstalado.idLocal;
            
            
-- Aqui eu fiz a mesma coisa, puxei os dados do usuario e do estabelecimento usando dois joins, usando um join para puxar as infos do usuario
-- pela tabela do estabelecimento e depois as infos do contrato usando um join no usuario e contrato 

-- eu devo ter explicado todo torto mas amanha eu desenrolo na explicação.

SELECT idContrato, inicio, fim, nomeUsuario, sobrenomeUsuario, nome FROM Contrato
	JOIN Estabelecimento on Contrato.fk_Estabelecimento = Estabelecimento.idEstabelecimento
		JOIN Usuario on Estabelecimento.fk_usuario = Usuario.idUsuario;
        

alter table Sensor
 add constraint chkStatus CHECK (status IN('Ativo','inativo'));
 


