CREATE TABLE usuario (
	id UUID NOT NULL PRIMARY KEY,
	nome VARCHAR(500) NOT NULL,
	senha VARCHAR(300) NOT NULL
);

INSERT INTO usuario(id, nome, senha) VALUES 
('c07e266d-5898-4bbc-ab0a-876716188fec', 'Gabriel', '123'),
('88e6f76c-b36d-44f4-b0d8-55024d70d029', 'Pedro', '123'),
('bfdcab5a-7f02-4207-857e-f8217964c110', 'William', '123');