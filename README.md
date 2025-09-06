### API de Regiões Geoespaciais

API RESTful para gerenciar e consultar regiões geográficas (polígonos em GeoJSON). Permite operações de CRUD e buscas espaciais avançadas por ponto, distância e endereço.

Tech Stack: Node.js, Express, TypeScript, MongoDB, Docker.

## Pré-requisitos

Para rodar este projeto, você precisa ter instalado na sua máquina:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/) (para clonar o repositório)

## Como Rodar o Projeto

**1. Clone o Repositório**
Abra um terminal e clone a branch `ozmap/luiz` do projeto para sua máquina:

```bash

git clone -b ozmap/luiz https://github.com/LhuizF/ozmap
```

**2. Navegue até a Pasta do Projeto**

```bash
cd ozmap
```

**3. Configure o ambiente**
No arquivo docker-compose.yml, localize a variável `GOOGLE_GEOCODING_API_KEY` e substitua `your_api_key_here` sua pela sua chave da API do Google Geocoding.

```yml
services:
  api:
    # ...
    environment:
      # ...
      GOOGLE_GEOCODING_API_KEY: SUA_CHAVE_DE_API_AQUI
```

**4. Inicie a Aplicação com Docker Compose**

Execute o seguinte comando.
Na primeira vez, ele irá baixar as imagens necessárias, construir as imagens do backend e iniciar os contêineres. Isso pode levar alguns minutos.

```bash
docker-compose up --build
```

- A flag `--build` força a reconstrução das imagens, garantindo que as últimas alterações do código sejam utilizadas.

**5. Parando a Aplicação**
Para parar todos os serviços, pressione `Ctrl + C` no terminal onde o compose está rodando, ou execute o seguinte comando na pasta do projeto:

```bash
docker-compose down
```

📚 Documentação
A documentação completa da API (OpenAPI) está disponível em:
http://localhost:3333/api-docs
