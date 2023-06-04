
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

INSERT iNTO alerta VALUES 
  ('2023-05-25 08:00:00', 24, 3),
  ('2023-05-25 09:00:00', 12, 3),
  ('2023-05-25 10:00:00', 6, 3),
  ('2023-05-25 11:00:00', 48, 3),
  ('2023-05-25 12:00:00', 96, 3);
-- INSERT TABELA USUARIO
desc usuario;
INSERT INTO usuario
values (
    1,
    'Guilherme',
    'Scarabelli',
    'gui@gmail.com',
    '123',
    default,
    1
  ),
  (
    1,
    'Vivian',
    'Silva',
    'vivian@gmail.com',
    '123',
    default,
    4
  ),
  (
    1,
    'Leonardo',
    'Bento',
    'leo@gmail.com',
    '123',
    default,
    2
  ),
  (
    1,
    'Renan',
    'Silva',
    'renan@gmail.com',
    '123',
    default,
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

INSERT INTO capturaDados VALUES
  ('2023-05-20 11:00:00', 1, 1),
  ('2023-05-20 11:00:01', 1, 1),
  ('2023-05-20 11:00:02', 1, 1),
  ('2023-05-20 11:00:03', 1, 1),
  ('2023-05-20 11:00:04', 1, 1),
  ('2023-05-20 11:00:05', 1, 1),
  ('2023-05-20 11:00:06', 1, 1),
  ('2023-05-20 11:00:15', 1, 1),
  ('2023-05-20 11:00:30', 1, 1),
  ('2023-05-20 11:00:45', 1, 1),
  ('2023-05-20 11:01:00', 1, 1),
  ('2023-05-20 11:01:15', 1, 1),
  ('2023-05-20 11:01:30', 1, 1),
  ('2023-05-20 11:01:45', 1, 1),
  ('2023-05-20 11:02:00', 1, 1);
-- INSERT INTO capturaDados VALUES 
--   ('2023-10-20 11:00:00', 1, 1),
--   ('2023-10-20 11:10:00', 1, 1),
--   ('2023-10-20 11:20:00', 1, 1),
--   ('2023-10-20 11:30:00', 1, 1),
--   ('2023-10-20 11:40:00', 1, 1),
--   ('2023-10-20 11:50:00', 1, 1),
--   ('2023-10-20 12:00:00', 1, 1);
-- Aqui está acontecendo um select mais "refinado", peguei para puxar apenas o id, valor da captura, o id do sensor
-- e o local em q ele foi instalado, eu fiz um join na tabela sensor e por la, eu pego o local em que o sensor foi instalado.
SELECT dtHora,
  valor,
  dtHora,
  idSensor,
  localInstalado,
  nomeFantasia
FROM capturaDados
  JOIN sensor ON capturaDados.fkSensor = sensor.idSensor
  JOIN localInstalado ON sensor.fkLocalInstalado = localInstalado.idLocal
  JOIN estabelecimento ON estabelecimento.idEstabelecimento = localInstalado.fkEstabelecimento;
-- AQUI TEMOS UM SELECT DOS USUARIOS, OS SEUS CARGOSOS E SEUS RESPECTIVOS ESTABELECIMENTOS 
SELECT nome as Contratante,
  nomeFantasia as Estabelecimento
FROM Estabelecimento
  JOIN Usuario ON usuario.fkEstabelecimento = estabelecimento.idEstabelecimento;
select *
from estabelecimento;