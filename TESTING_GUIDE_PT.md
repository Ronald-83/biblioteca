# 🎬 Guia Passo a Passo - Como Testar o Sistema de Playlists

## ✅ Pré-requisitos
- ✅ Node.js instalado
- ✅ MongoDB conectado (Atlas ou local)
- ✅ npm packages instalados (`npm install`)

---

## 📋 Opção 1: Testar com Dados de Exemplo (Recomendado)

### Passo 1: Popular o Banco de Dados
```bash
node populatePlaylistsDb.js "sua_url_mongodb_completa"
```

**Exemplo:**
```bash
node populatePlaylistsDb.js "mongodb+srv://usuario:senha@cluster0.abc123.mongodb.net/library?retryWrites=true&w=majority"
```

**Resultado esperado:**
```
Debug: About to connect
Debug: Should be connected?
Adding songs
Added song: Bohemian Rhapsody by Queen
Added song: Imagine by John Lennon
...
Adding playlists
Added playlist: Rock Classics
Added playlist: Modern Hits
Added playlist: Chill Vibes
Debug: Closing mongoose
```

### Passo 2: Iniciar o Servidor
```bash
npm start
```

**Resultado esperado:**
```
> express-locallibrary-tutorial@0.0.0 start
> node ./bin/www
```

O servidor deve iniciar sem erros.

### Passo 3: Acessar a Interface
Abra seu navegador e acesse:

1. **Home da Biblioteca**
   ```
   http://localhost:3006
   ```
   Você deve ver os contadores:
   - Playlists: 3
   - Songs: 10

2. **Listagem de Playlists**
   ```
   http://localhost:3006/catalog/playlists
   ```
   Você deve ver 3 playlists:
   - Rock Classics
   - Modern Hits
   - Chill Vibes

3. **Detalhes de uma Playlist**
   Clique em "View" em qualquer playlist para ver as músicas

---

## 🎵 Opção 2: Testar Criando Dados Manualmente

### Passo 1: Iniciar o Servidor
```bash
npm start
```

### Passo 2: Ir para Criar Playlist
```
http://localhost:3006/catalog/playlist/create
```

### Passo 3: Preencher o Formulário
- **Playlist Name:** "Minhas Músicas Favoritas"
- **Description:** "Minha coleção pessoal de Songs"
- Click: **Submit**

Você será redirecionado para os detalhes da playlist (vazia por enquanto).

### Passo 4: Adicionar Músicas
1. Clique em **"Add Song"**
2. Preencha os campos:
   - **Song Name:** Bohemian Rhapsody
   - **Artist:** Queen
   - **Genre:** Rock
   - **Year of Creation:** 1975
   - **Rating:** 5
   - **Description:** Epic rock opera
   - **Album/Referential Image URL:** (deixe em branco ou coloque URL)
3. Click: **Add Song**

A música será adicionada à playlist! ✅

### Passo 5: Adicionar Mais Músicas
Repita o Passo 4 com outras músicas, por exemplo:
- Imagine, John Lennon, 1971, Rock, 5 estrelas
- Hotel California, Eagles, 1976, Rock, 4.8 estrelas

---

## 🧪 Testando as Funcionalidades

### 1. Editar Playlist
- Na listagem, click em **"Edit"** em uma playlist
- Altere o nome/descrição
- Click: **Submit**

### 2. Editar Música
- Na página de detalhes da playlist
- Click em **"Edit"** contíguo à música
- Altere os dados
- Click: **Update Song**

### 3. Remover Música
- Na página de detalhes da playlist
- Click em **"Remove"** contíguo à música
- Confirme a remoção

### 4. Deletar Playlist
- Na listagem de playlists, click em **"Delete"**
- Confirme a exclusão
- A playlist e todas suas músicas serão deletadas

---

## 🔍 Verificando no MongoDB

Para verificar os dados armazenados:

### Via MongoDB Atlas (Cloud)
1. Acesse https://cloud.mongodb.com
2. Vá para "Collections"
3. Você verá duas coleções:
   - `playlists` - Contém suas playlists
   - `songs` - Contém todas as músicas

### Via MongoDB Compass (Local)
1. Abra MongoDB Compass
2. Conecte à sua instância
3. Selecione seu banco de dados
4. Veja as coleções `playlists` e `songs`

---

## ✨ Testando Validações

### Validação 1: Nome da Playlist é Obrigatório
- Vá para criar playlist
- Deixe o campo "Playlist Name" vazio
- Click Submit
- **Resultado:** Mensagem de erro aparece ✅

### Validação 2: Campos da Música Obrigatórios
- Vá para adicionar música
- Deixe fields vazios
- Click: "Add Song"
- **Resultado:** Mensagens de erro aparecem ✅

### Validação 3: Rating entre 0 e 5
- Ao adicionar música
- Digite "10" no campo Rating
- Click: "Add Song"
- **Resultado:** Erro - "Rating must be between 0 and 5" ✅

### Validação 4: Ano entre 1900 e Ano Atual
- Digite "1850" no campo Year
- **Resultado:** Erro aparece ✅

---

## 🎨 Testando a Interface

### Links de Navegação
- ✅ Link "View All Playlists" na home
- ✅ Link "Create New Playlist" na home
- ✅ Links "Add Song", "Edit", "Delete" nas playlists
- ✅ Link "Back to Playlists" nas páginas

### Responsividade
- Teste em desktop
- Teste em tablet (F12 → Device toolbar)
- Teste em mobile

---

## 🐛 Se Algo Não Funcionar

### Erro: "Cannot find module 'mongoose'"
```bash
npm install mongoose
```

### Erro: Conexão com MongoDB falha
- Verifique a URL em `bin/www`
- Verifique se MongoDB está rodando
- Verifique credenciais (usuário/senha)

### Erro: Porta 3006 já está em uso
```bash
# Mude a porta em bin/www
PORT=3007 npm start
```

### Erro: Views não encontradas
- Verifique que as pastas em `views/tutorial/playlistViews/` existem
- Verifique que todos os arquivos .pug estão criados

---

## ✅ Checklist de Funcionalidades

- [ ] Pode acessar a página inicial
- [ ] Pode acessar a listagem de playlists
- [ ] Pode criar uma nova playlist
- [ ] Pode adicionar músicas à playlist
- [ ] Pode editar playlist
- [ ] Pode editar música
- [ ] Pode remover música
- [ ] Pode deletar playlist
- [ ] Dados estão salvos no MongoDB
- [ ] Validações funcionam
- [ ] Mensagens de erro aparecem corretamente
- [ ] Links de navegação funcionam

---

## 🎉 Sucesso!

Se todos os checks acima estão marcados, seu sistema está 100% funcional! 

Agora você pode começar a personalizar conforme necessário:
- Adicionar estilos CSS customizados em `public/stylesheets/style.css`
- Adicionar mais campos aos modelos conforme necessário
- Integrar autenticação de usuários
- Adicionar más funcionalidades

**Happy coding! 🚀**
