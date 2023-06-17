# Funcionalidade: Gerenciar Categorias

# Como um administrador do sistema,
Eu desejo criar, ler, atualizar e excluir categorias,
Para organizar e categorizar os locais disponíveis.

# Contexto:
Dado que eu estou logado como administrador do sistema

---

## Cenário: Criar uma nova categoria
Dado que eu estou na página de criação de categorias
E eu selecionei um ícone para a categoria
E eu preenchi o campo "Nome" com "Exemplo Categoria"
Quando eu clicar no botão "Criar"
Então a categoria deve ser salva no sistema
E eu devo ser redirecionado para a página de detalhes da categoria

---

## Cenário: Ler informações de uma categoria existente
Dado que eu estou na página de detalhes de uma categoria existente
Quando eu visualizar as informações da categoria
Então eu devo ver o ícone associado à categoria
E eu devo ver o campo "Nome" preenchido com o nome da categoria existente
E eu devo ver a lista de locais relacionados à categoria

---

## Cenário: Atualizar informações de uma categoria existente
Dado que eu estou na página de detalhes de uma categoria existente
Quando eu clicar no botão "Editar"
Então devo ser redirecionado para a página de edição da categoria
E devo ver os campos preenchidos com as informações atuais da categoria
Quando eu atualizar os campos desejados
E clicar no botão "Salvar"
Então as informações da categoria devem ser atualizadas no sistema
E eu devo ser redirecionado para a página de detalhes da categoria atualizada

---

## Cenário: Excluir uma categoria existente
Dado que eu estou na página de detalhes de uma categoria existente
Quando eu clicar no botão "Excluir"
Então devo ver uma mensagem de confirmação de exclusão da categoria
Quando eu confirmar a exclusão
Então a categoria deve ser removida do sistema
E eu devo ser redirecionado para a página inicial de categorias