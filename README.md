# 🏥 MedClinic API

## Descrição do Projeto
A MedClinic API é um sistema back-end desenvolvido para o gerenciamento de uma clínica médica de pequeno porte, como parte do Programa SCTec (SENAI/SC). 

Nesta **primeira etapa**, o escopo do projeto foca exclusivamente na construção da base de acesso seguro ao sistema. Foram implementadas as funcionalidades de cadastro de usuários, autenticação baseada em tokens (JWT) e controle de autorização baseado em funções (RBAC - Role-Based Access Control). Os módulos de domínio da clínica (médicos, pacientes, consultas) serão integrados em etapas futuras sobre esta estrutura.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** — 24.14.1
* **TypeScript** — 6.0.3
* **Express.js** — 5.2.1
* **PostgreSQL** — 18.4
* **TypeORM** — 1.1.1
* **Bcrypt.js** — 3.0.3
* **JSON Web Token (JWT)** — 9.0.3
* **Class-validator** — 0.15.1
* **Class-transformer** — 0.5.1
* **Dotenv** — 17.4.2
* **CORS** — 2.8.6 

---

## 📦 Requisitos para Execução
Para executar o projeto localmente, é necessário ter instalado:
* **Node.js** — versão 24 ou superior
* **PostgreSQL** — versão 18 ou superior
* **Git** — para clonar o repositório

## ⚙️ Configuração do Banco de Dados e Variáveis de Ambiente
Na raiz do projeto, crie um arquivo `.env` baseando-se no arquivo `.env.example` disponibilizado. Preencha as variáveis com as credenciais do seu banco de dados PostgreSQL e uma chave secreta para o JWT.

Exemplo de configuração do `.env`:
```env
PORT=3000

# Configurações do Banco de Dados (PostgreSQL)

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=medClinic-api
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_TIME_OUT_MS=30000


# Chave Secreta para assinatura do Token JWT
JWT_SECRET=sua_chave_secreta_super_segura
JWT_EXPIRES_IN=1800s
```

## 🚀 Instalação e Execução da Aplicação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/BrunaFraga-0/medClinic-api
   ```
2. **Entre na pasta:**
   ```bash
   cd medClinic-api
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Crie o Banco de Dados:**

Antes de rodar a aplicação, abra o seu gerenciador do PostgreSQL (como pgAdmin) e crie um banco de dados vazio com o mesmo nome definido no seu arquivo .env (ex: medClinic-api).

5. **Execute as Migrations para criar a tabela:**

Para criar a tabela de usuários no banco de dados, rode o script de migrations configurado no projeto:

  ```bash
  npm run migration:run
  ```

6. **Inicie o servidor em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *O servidor iniciará na porta configurada no `.env` (ex: http://localhost:3000).*

---

## 🗂️ Arquitetura do Projeto e Estrutura de Pastas
O projeto segue uma **arquitetura em camadas, inspirada no padrão MVC**, visando a separação de responsabilidades e facilitando a manutenção e a escalabilidade para as próximas etapas.

```text
medClinic-api/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts          # Recebe requisições de autenticação
│   │   └── UserController.ts          # Recebe requisições de usuários
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 1789335775863-CreateUserTable.ts  # Cria a tabela users
│   │   └── data-source.ts             # Configura a conexão com o banco
│   │
│   ├── dtos/
│   │   ├── CreateUserDto.ts            # Define e valida dados de cadastro
│   │   ├── LoginDto.ts                 # Define e valida dados de login
│   │   ├── LoginResponseDto.ts         # Define os dados retornados no login
│   │   └── UserResponseDto.ts          # Define os dados retornados do usuário
│   │
│   ├── entities/
│   │   └── User.ts                     # Representa a entidade User
│   │
│   ├── error/
│   │   └── AppError.ts                 # Define erros personalizados da aplicação
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts           # Valida o token JWT
│   │   ├── errorMiddleware.ts          # Centraliza o tratamento de erros
│   │   ├── roleMiddleware.ts           # Controla o acesso por perfil
│   │   └── validate.ts                 # Valida os dados das requisições
│   │
│   ├── repositories/
│   │   └── UserRepository.ts           # Centraliza o acesso aos usuários no banco
│   │
│   ├── routes/
│   │   ├── adminRoutes.ts              # Define rotas administrativas
│   │   ├── authRoutes.ts               # Define rotas de autenticação
│   │   └── userRoutes.ts               # Define rotas de usuários
│   │
│   ├── services/
│   │   ├── AuthService.ts              # Contém regras de autenticação
│   │   └── UserService.ts              # Contém regras de usuários
│   │
│   ├── utils/
│   │   ├── bcrypt.ts                   # Funções de hash e comparação de senha
│   │   └── jwt.ts                      # Funções de geração e validação de JWT
│   │
│   └── server.ts                       # Inicializa o servidor Express
│
├── .env.example                        # Modelo das variáveis de ambiente
├── .gitignore                           # Define arquivos ignorados pelo Git
├── package.json                         # Dependências e scripts do projeto
├── package-lock.json                    # Registra versões das dependências
├── README.md                            # Documentação do projeto
└── tsconfig.json                        # Configuração do TypeScript
```

--- 
## 👥 Perfis de Acesso Disponíveis (RBAC)
O sistema possui controle de acesso baseado em funções, suportando os seguintes perfis:
* **Administrador (`ADMIN`)**: possui acesso às rotas administrativas e aos recursos restritos da API.
* **Atendente (`ATENDENTE`)**: Possui acesso operacional restrito, não podendo acessar rotas exclusivas de administração.

---

## Documentação dos Endpoints (Autenticação e Autorização)

### 1. Cadastro de Usuário
Cria um novo usuário no sistema com a senha criptografada.
* **Rota:** `/users/register`
* **Método:** `POST`
* **Parâmetros (Body JSON):**
  ```json
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "SenhaSegura@123",
    "role": "ADMIN"
  }
  ```

*O campo role é opcional e aceita os valores ADMIN ou ATENDENTE. Quando não informado, o perfil padrão é ATENDENTE.*

* **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": "uuid-gerado-pelo-banco",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "ADMIN",
    "createdAt": "2026-09-13T10:00:00.000Z"
  }
  ```

### 2. Login de Usuário
Autentica o usuário e retorna o token JWT.
* **Rota:** `/auth/login`
* **Método:** `POST`
* **Parâmetros (Body JSON):**
  ```json
  {
    "email": "joao@email.com",
    "password": "SenhaSegura@123"
  }
  ```
* **Resposta de Sucesso (200 OK):**
  ```json
  {
    "token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-gerado-pelo-banco",
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "ADMIN"
    }
  }
  ```

### 3. Obter Dados do Usuário Autenticado
Valida o token JWT e retorna os dados do próprio usuário.
* **Rota:** `/users/me`
* **Método:** `GET`
* **Cabeçalhos Exigidos (Headers):**
  * `Authorization`: `Bearer <seu_token_jwt>`
* **Resposta de Sucesso (200 OK):**
  ```json
  {
    "id": "uuid-gerado-pelo-banco",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "ADMIN",
    "createdAt": "2026-09-13T10:00:00.000Z"
  }
  ```

### 4. Rota Restrita (Demonstração de Autorização)
Endpoint exclusivo para testar a autorização de perfil (RBAC). Só pode ser acessado por usuários com perfil `ADMIN`.
* **Rota:** `/admin/ping`
* **Método:** `GET`
* **Cabeçalhos Exigidos (Headers):**
  * `Authorization`: `Bearer <seu_token_jwt>`
* **Resposta de Sucesso (200 OK) - Perfil ADMIN:**
  ```json
  {
    "message": "Acesso autorizado"
  }
  ```
* **Resposta de Erro (403 Forbidden) - Perfil ATENDENTE:**
  ```json
  {
    "status": "error",
    "message": "Sem permissão para acessar este recurso"
  }
  ```

---

## Validações e Tratamento de Erros

A API utiliza códigos HTTP para indicar o resultado das operações e possui tratamento centralizado de erros através de `AppError` e `errorMiddleware`.

| Status | Significado | Utilizado para |
|---|---|---|
| **400 Bad Request** | Requisição inválida | Dados de entrada que não passam pelas validações dos DTOs, como campos obrigatórios ausentes ou formato inválido |
| **401 Unauthorized** | Não autenticado | Token JWT ausente ou inválido, tratado pelo `authMiddleware`, e credenciais incorretas no login |
| **403 Forbidden** | Acesso proibido | Usuário autenticado, mas sem permissão para acessar determinado recurso, tratado pelo `roleMiddleware` |
| **404 Not Found** | Recurso não encontrado | Usuário não encontrado pelo identificador informado |
| **409 Conflict** | Conflito | Tentativa de cadastrar um usuário utilizando um e-mail que já está cadastrado |
| **500 Internal Server Error** | Erro interno do servidor | Erros inesperados não tratados especificamente pela aplicação |

---

## 🎥 Demonstração

Vídeo de apresentação do projeto, demonstrando a estrutura da API,
autenticação e autorização com JWT, validações e tratamento de erros.

▶️ [Assistir ao vídeo no YouTube](https://www.youtube.com/watch?v=aSW4SVzzP7Y)

---

*Desenvolvido por Bruna Fraga*

---
