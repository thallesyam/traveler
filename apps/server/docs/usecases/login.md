# Funcionalidade: Login

## Cenário: Login com sucesso
Dado que o usuário possui um email válido
E o usuário possui uma senha válida
Quando o usuário insere o email e a senha corretamente
Então o sistema deve retornar um token de acesso

## Cenário: Email inválido
Dado que o usuário possui um email inválido
E o usuário possui uma senha válida
Quando o usuário insere o email inválido e a senha corretamente
Então o sistema exibe uma mensagem de erro: "Email ou senha inválido"

## Cenário: Senha inválida
Dado que o usuário possui um email válido
E o usuário possui uma senha inválida
Quando o usuário insere o email corretamente e a senha inválida
Então o sistema exibe uma mensagem de erro: "Email ou senha inválido"

## Cenário: Email e senha inválidos
Dado que o usuário possui um email inválido
E o usuário possui uma senha inválida
Quando o usuário insere o email inválido e a senha inválida
Então o sistema exibe uma mensagem de erro: "Email ou senha inválido"