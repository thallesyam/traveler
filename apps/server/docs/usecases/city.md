# Cenário: Adicionar uma cidade
Dado que o usuário deseja adicionar uma nova cidade
Quando o usuário preenche todos os campos obrigatórios: nome da cidade, fotos da cidade e descrição da cidade
Então o sistema adiciona a cidade com sucesso
E exibe uma mensagem de confirmação: "Cidade adicionada com sucesso"

---

# Cenário: Adicionar uma cidade sem preencher campos obrigatórios
Dado que o usuário deseja adicionar uma nova cidade
Quando o usuário não preenche algum dos campos obrigatórios: nome da cidade, fotos da cidade ou descrição da cidade
Então o sistema exibe uma mensagem de erro indicando o campo não preenchido: "Por favor, preencha todos os campos obrigatórios"

---

# Cenário: Visualizar detalhes de uma cidade
Dado que o usuário deseja visualizar os detalhes de uma cidade existente
Quando o usuário seleciona uma cidade da lista
Então o sistema exibe as informações da cidade: nome, fotos e descrição

---

# Cenário: Editar uma cidade
Dado que o usuário deseja editar os dados de uma cidade existente
Quando o usuário seleciona uma cidade da lista e realiza as alterações desejadas nos campos: nome da cidade, fotos da cidade ou descrição da cidade
Então o sistema salva as alterações com sucesso
E exibe uma mensagem de confirmação: "Cidade atualizada com sucesso"

---

# Cenário: Excluir uma cidade
Dado que o usuário deseja excluir uma cidade existente
Quando o usuário seleciona uma cidade da lista e confirma a exclusão
Então o sistema remove a cidade com sucesso
E exibe uma mensagem de confirmação: "Cidade excluída com sucesso"