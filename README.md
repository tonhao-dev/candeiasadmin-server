# 🏆 Sobre o projeto

Este projeto foi desenvolvido com o objetivo de servir como componente para o trabalho de conclusão de curso dos alunos Luís Antônio e Ezequiel Soares [IFAC](https://ifac.edu.br/).

[Figma](https://www.figma.com/design/uGfeifBL9T3d0CZG5Frhu4/CandeiasAdmin?node-id=0-1&node-type=CANVAS&t=9Q9JvigNGF3vhHne-0)

---

## ⚒ Ferramentas

As principais ferramentas utilizadas na aplicação são:

- [Node.JS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/pt-BR/)

---

## 🚀 Iniciar o projeto

Versões necessárias:

```bash
Node >= v22.20.0
Yarn >= 1.22.22
Docker >= 27.5.1
```

Instale o Yarn (caso ainda não esteja instalado):

```sh
npm install --global yarn
```

Clone o repositório:

```sh
git clone git@github.com:tonhao-dev/candeiasadmin-server.git
```

Acesse a pasta do projeto:

```sh
cd candeiasadmin-server
```

Instale as dependências:

```sh
yarn install
```

Iniciar em modo de desenvolvedor:

```sh
docker compose up
yarn dev
```

Iniciar em modo de prod:

```sh
yarn build
node dist/index.js
```

Iniciar usando docker:
```sh
docker build -t candeiasadmin-server:0.0.1 .
docker run -d --name candeiasadmin-server -p 3000:8080 candeiasadmin-server:0.0.1
```

---

Feito com ❤️
