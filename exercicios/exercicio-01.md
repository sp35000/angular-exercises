# Exercício 01

## Objetivo

* Instalar NVM, Node.js e NPM

## Duração

15 minutos

---

!!! warning "ATENÇÃO! Antes de começar:"

    Verifique se já existe um `node` instalado no seu ambiente com o comando: `which node`. Se já existir um node e o caminho for algo como `/bin/bash`, você precisará **DESINSTALAR** o node atual. Para remover o node do ubuntu, faça: `sudo apt-get purge --auto-remove nodejs npm`.

---

## NVM


Para instalar (ou atualizar) o NVM, você deve executar o script de instalação, usando cURL:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Ou com wget:

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Depois de rodar o script de instalação, execute o comando abaixo para verificar a instalação:

```bash
nvm --version

# resultado esperado:
0.33.11
```

Se você não tiver nenhuma resposta, ou se aparecer o erro:

```bash
nvm: command not found
```

Feche e abra novamente seu terminal e tente verificar novamente.


## Node.js e NPM

Para instalar o Node.js **LTS** (*Long Term Support*), execute o comando:

```bash
nvm install --lts
```

Esse comando irá instalar a última versão LTS do Node.js e também vai instalar o NPM.

Para confirmar a instalação do Node.js, execute:

```bash
node --version
```

O resultado esperado é:

```bash
v8.11.3
```

!!! success "DICA: nvm"

    Se você já tem uma versão de node instalada (ex. v6.x.y) e quer atualizar para a v8,<br>execute: `nvm install 8 --reinstall-packages-from=6`. Assim, todos os pacotes **globais** serão reinstalados também na nova versão.

Para confirmar a instalação do NPM, execute:

```bash
npm --version

# o resultado esperado é:
5.6.0
```

## Visual Studio Code

Para instalar o VS Code, baixe a versão apropriada (.deb ou .rpm) de acordo com a sua distribuição Linux no endereço: [https://code.visualstudio.com/](https://code.visualstudio.com/)


### Plugins

Adicionalmente, instale os seguintes plugins recomendados:

* `ext install Angular.ng-template` | Ref.: [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* `ext install pavellev.Angular2` | Ref.: [Angular v5 Snippets](https://marketplace.visualstudio.com/items?itemName=pavellev.Angular2)
* `ext install msjsdiag.debugger-for-chrome` | Ref.: [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* `ext install EditorConfig.EditorConfig` | Ref.: [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* `ext install rbbit.typescript-hero` | Ref.: [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)
* <del>Terminal</del> Não precisa mais. Já vem por padrão no vscode.

## Referências

* NVM (*Node Version Manager*): [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
* Node Release Schedule: [https://github.com/nodejs/Release#lts_schedule](https://github.com/nodejs/Release#lts_schedule)

## Próximo passo

[Exercício 02](exercicio-02.md)
