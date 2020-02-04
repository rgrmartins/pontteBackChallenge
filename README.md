# pontteBackChallenge
Application for generating, editing and listing loan contracts.

Aplicação destinada a geração, edição e listagem de contratos de empréstimos, através desta aplicação o usuário poderá preencher uma proposta com seus dados pessoais, realizar upload de documentos e ai aguardar a aprovação ou não da proposta. 
Esta aplicação foi desenvolvida usando NodeJS para uma API REST, banco Postgres.

# Algumas das tecnologias utilizadas
 - Express
 - Nodemon,
 - Prettier,
 - Eslint (usando a Style Guide do Airbnb),
 - DotEnv (para configurações de variáveis de ambiente),
 - Youch,
 - Yup,
 - React-router-dom,
 - Cors,
 - Crypto,
 - Multer.
 
A aplicação está utilizando containers docker para os banco de dados Postgres.

# Funcionalidades
- Criação de Propostas;
- Upload de imagens de documentos;
- Aprovação ou Reprovação da Proposta;
- Listagem de todas as propostas e Documentos salvos.

# Passos para subir a aplicação
- Clonar este projeto do GitHub (https://github.com/rgrmartins/pontteBackChallenge.git);
- Na máquina em que o projeto foi clonado é necessário ter o NodeJS instalado;
- No terminal da maquina em que o projeto foi clonado é necessário instalar as dependencias (recomendo usar Yarn) $ yarn;
- Levantar os Containers com o banco Postgres (as Imagens utilizadas no projeto estão logo embaixo):
	- Postgres => $ docker run --name database -p 5432:5432 -d -t postgres
- No código do Backend é necessário preencher as informações das variáveis de ambiente, no repositório o arquivo env.example serve de molde para a criação do .env;
- Umas das formas de se testar a API desenvolvida, antes do desenvolvimento do frontend foi o Insomina, um client para testar API Rest. ( https://insomnia.rest/ );
- Com os containers dos bancos rodando, variáveis de ambiente configuradas é possível subir a aplicação, rodando o seguintes scripts no terminal:
	-No diretório do pontteBackChallenge: $ yarn dev (levanta a aplicação);
- assim o usuário poderá realizar o envio das propostas, documentos e aprovação ou não da proposta, através das rotas.

# Observação
Está aplicação foi desenvolvida em ambiente de desenvolvimento, alguns passos como autenticação, uso e configuração do PM2 e demais configurações para deploy em produção, foram abstraidos para que fosse alcançado o objetivo em tempo hábil.


