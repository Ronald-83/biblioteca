# 🎵 Playlist de Músicas - Guia de Implementação

## Estrutura Criada

Foram adicionados os seguintes arquivos para gerenciar playlists de músicas:

### Models
- **`models/tutorial/playlist.js`** - Schema de Playlist com campos: nome, descrição, lista de músicas, datas de criação/atualização
- **`models/tutorial/song.js`** - Schema de Song com campos: nome, artista, gênero, ano, avaliação (0-5), descrição, imagem, data de adição

### Controllers
- **`controllers/tutorial/playlistController.js`** - Controlador completo com operações CRUD para playlists e músicas

### Views (Pug Templates)
- **`views/tutorial/playlistViews/playlist_list.pug`** - Listagem de todas as playlists
- **`views/tutorial/playlistViews/playlist_detail.pug`** - Detalhes de uma playlist com suas músicas
- **`views/tutorial/playlistViews/playlist_form.pug`** - Formulário para criar/editar playlist
- **`views/tutorial/playlistViews/playlist_delete.pug`** - Confirmação de exclusão de playlist
- **`views/tutorial/playlistViews/song_form.pug`** - Formulário para adicionar/editar músicas na playlist
- **`views/tutorial/playlistViews/song_delete.pug`** - Confirmação de remoção de música

### Rotas
As seguintes rotas foram adicionadas em `routes/catalog.js`:

#### Playlists
- `GET /catalog/playlists` - Listar todas as playlists
- `GET /catalog/playlist/create` - Formulário de criação de playlist
- `POST /catalog/playlist/create` - Criar nova playlist
- `GET /catalog/playlist/:id` - Detalhes da playlist
- `GET /catalog/playlist/:id/update` - Formulário de edição
- `POST /catalog/playlist/:id/update` - Atualizar playlist
- `GET /catalog/playlist/:id/delete` - Confirmação de exclusão
- `POST /catalog/playlist/:id/delete` - Deletar playlist

#### Músicas (Subrotas)
- `GET /catalog/playlist/:id/song/create` - Formulário para adicionar música
- `POST /catalog/playlist/:id/song/create` - Adicionar música à playlist
- `GET /catalog/playlist/:id/song/:songId/update` - Formulário de edição de música
- `POST /catalog/playlist/:id/song/:songId/update` - Atualizar música
- `GET /catalog/playlist/:id/song/:songId/delete` - Confirmação de remoção
- `POST /catalog/playlist/:id/song/:songId/delete` - Remover música da playlist

## Como Usar

### 1. Inicializar Dados de Teste (Opcional)
Execute o script para popular playlists de exemplo:
```bash
node populatePlaylistsDb.js "mongodb+srv://seu_usuario:sua_senha@cluster0.cojoign.mongodb.net/seu_banco?retryWrites=true&w=majority"
```

### 2. Iniciar o Servidor
```bash
npm start
```

### 3. Acessar a Interface
- Listagem de Playlists: `http://localhost:3006/catalog/playlists`
- Criar nova Playlist: `http://localhost:3006/catalog/playlist/create`

## Campos da Música

Cada música possibilita armazenar:
- **Nome**: Nome da música (obrigatório)
- **Artista**: Nome do artista (obrigatório)
- **Gênero**: Gênero música (obrigatório)
- **Ano de Criação**: Ano de lançamento (obrigatório, entre 1900 e ano atual)
- **Avaliação**: Classificação de 0 a 5 estrelas (obrigatório)
- **Descrição**: Descrição opcional
- **Imagem de Álbum**: URL da imagem opcional
- **Data de Adição**: Data quando foi adicionada à playlist (automática)

## Validações Implementadas

- Nome da playlist obrigatório
- Nome, artista e gênero da música obrigatórios
- Ano entre 1900 e ano atual
- Avaliação entre 0 e 5
- Sanitização de dados para prevenção de XSS
- Tratamento de erros com mensagens amigáveis

## Próximos Passos

1. Conectar com seu banco de dados MongoDB (altere a URL em `bin/www`)
2. Testar as funcionalidades CRUD
3. Personalizar o CSS conforme necessário

---

**Nota**: O projeto já está pronto para ser conectado com um banco de dados MongoDB. A conexão é feita automaticamente ao iniciar o servidor.
