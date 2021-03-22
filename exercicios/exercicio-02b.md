# Exercício 02 - Complemento

## Objetivos

* Realizar o controle de versão no `git.serpro`

## Duração

10 minutos


## Controle de versão no git.serpro

Para um melhor acompanhamento da evolução da aplicação que você vai construir, iremos configurar um repositório no git.serpro.
Se você ainda não configurou o acesso ao git.serpro, o seguintes passos irão fazer isso:


### Configurando a chave SSH

Acesse a página [https://git.serpro/profile/keys](https://git.serpro/profile/keys). Nela você realiza a gestão das suas chaves de acesso SSH para estabelecer uma conexão segura entre a **sua máquina** e o servidor **git.serpro**.

Se você NÃO tem uma chave SSH gerada gere a com o comando:
```
ssh-keygen
```

Uma vez gerada a chave, siga os passos abaixo para copiar para o clipboard o conteudo da chave gerada.

```
# Downloads and installs xclip. 
sudo apt-get install xclip

# Copies the contents of the id_rsa.pub file to your clipboard
xclip -sel clip < ~/.ssh/id_rsa.pub
```

Abra a página <a href="https://git.serpro/profile/keys">https://git.serpro/profile/keys</a> e insira o conteúdo do clipboard no campo apropriado. 

### Configurando o repositório

```bash
cd app-exemplo
git init
git remote add origin git@git.serpro:${USER}/app-exemplo.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

## Referências

* <a href="https://cli.angular.io/" target="_blank">Angular CLI: https://cli.angular.io/</a> 

## Próximo passo

[Exercício 03](exercicio-03.md)
