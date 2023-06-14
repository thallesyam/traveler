# Funcionalidade: Gerenciar Locais

# Como um administrador do sistema,
Eu desejo criar, ler, atualizar e excluir locais,
Para fornecer informações precisas e atualizadas sobre os locais disponíveis.

# Contexto:
Dado que eu estou logado como administrador do sistema

---

## Cenário: Criar um novo local
Dado que eu estou na página de criação de locais
E eu preenchi o campo "Nome do local" com "Exemplo Place"
E eu selecionei uma ou mais fotos para o local
E eu preenchi o campo "Descrição do local" com "Uma breve descrição do local"
E eu preenchi o campo "Address" com "Endereço do local"
E eu preenchi o campo "Atendimento" com "Horário de atendimento do local"
E eu marquei a opção "É um destaque"
E eu adicionei um ou mais comentários relacionados ao local
Quando eu clicar no botão "Criar"
Então o local deve ser salvo no sistema
E eu devo ser redirecionado para a página de detalhes do local

---

## Cenário: Ler informações de um local existente
Dado que eu estou na página de detalhes de um local existente
Quando eu visualizar as informações do local
Então eu devo ver o campo "Nome do local" preenchido com o nome do local existente
E eu devo ver as fotos relacionadas ao local
E eu devo ver a descrição do local
E eu devo ver o endereço do local
E eu devo ver o horário de atendimento do local
E eu devo ver se o local é um destaque
E eu devo ver os comentários relacionados ao local

---

## Cenário: Atualizar informações de um local existente
Dado que eu estou na página de detalhes de um local existente
Quando eu clicar no botão "Editar"
Então devo ser redirecionado para a página de edição do local
E devo ver os campos preenchidos com as informações atuais do local
Quando eu atualizar os campos desejados
E clicar no botão "Salvar"
Então as informações do local devem ser atualizadas no sistema
E eu devo ser redirecionado para a página de detalhes do local atualizado

---

## Cenário: Excluir um local existente
Dado que eu estou na página de detalhes de um local existente
Quando eu clicar no botão "Excluir"
Então devo ver uma mensagem de confirmação de exclusão do local
Quando eu confirmar a exclusão
Então o local deve ser removido do sistema
E eu devo ser redirecionado para a página inicial de locais