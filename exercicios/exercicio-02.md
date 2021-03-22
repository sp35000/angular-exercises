# Exercício 02

## Objetivos

* Instalar o Angular CLI
* Criar a primeira aplicação Angular
* Executar a aplicação

## Duração

15 minutos

## Instalando o Angular CLI

Para instalar o Angular CLI, execute:

```bash
npm install -g @angular/cli
```

Para verificar a instalação, execute:

```bash
ng version
```

O resultado esperado é:

```bash
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 6.0.8
Node: 8.11.3
OS: linux x64
Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.6.8
@angular-devkit/core         0.6.8
@angular-devkit/schematics   0.6.8
@schematics/angular          0.6.8
@schematics/update           0.6.8
rxjs                         6.2.1
typescript                   2.7.2

```

Para mais informações sobre todos os comandos disponíveis do Angular CLI, execute:

```bash
ng help
```

Se você quiser saber mais sobre um comando específico, execute `ng [command name] --help`. Por exemplo:

```bash
ng generate --help
```

## Criando a primeira aplicação Angular

Para criar a primeira aplicação Angular, execute:

```bash
ng new app-exemplo
```

Esse comando irá criar a aplicação "app-exemplo" numa pasta com mesmo nome, e instalar as dependências necessárias.

!!! warning "Nome do projeto"

    O "app-exemplo" é apenas uma sugestão. O nome escolhido aqui deve ser o mesmo até o exercício 08.


O resultado esperado é algo como:

```bash
CREATE app-exemplo/README.md (1027 bytes)
CREATE app-exemplo/angular.json (3593 bytes)
CREATE app-exemplo/package.json (1315 bytes)
CREATE app-exemplo/tsconfig.json (384 bytes)
CREATE app-exemplo/tslint.json (2805 bytes)
CREATE app-exemplo/.editorconfig (245 bytes)
CREATE app-exemplo/.gitignore (503 bytes)
CREATE app-exemplo/src/environments/environment.prod.ts (51 bytes)
CREATE app-exemplo/src/environments/environment.ts (631 bytes)
CREATE app-exemplo/src/favicon.ico (5430 bytes)
CREATE app-exemplo/src/index.html (297 bytes)
CREATE app-exemplo/src/main.ts (370 bytes)
CREATE app-exemplo/src/polyfills.ts (3194 bytes)
CREATE app-exemplo/src/test.ts (642 bytes)
CREATE app-exemplo/src/assets/.gitkeep (0 bytes)
CREATE app-exemplo/src/styles.css (80 bytes)
CREATE app-exemplo/src/browserslist (375 bytes)
CREATE app-exemplo/src/karma.conf.js (964 bytes)
CREATE app-exemplo/src/tsconfig.app.json (194 bytes)
CREATE app-exemplo/src/tsconfig.spec.json (282 bytes)
CREATE app-exemplo/src/tslint.json (314 bytes)
CREATE app-exemplo/src/app/app.module.ts (314 bytes)
CREATE app-exemplo/src/app/app.component.css (0 bytes)
CREATE app-exemplo/src/app/app.component.html (1141 bytes)
CREATE app-exemplo/src/app/app.component.spec.ts (994 bytes)
CREATE app-exemplo/src/app/app.component.ts (207 bytes)
CREATE app-exemplo/e2e/protractor.conf.js (752 bytes)
CREATE app-exemplo/e2e/src/app.e2e-spec.ts (307 bytes)
CREATE app-exemplo/e2e/src/app.po.ts (208 bytes)
CREATE app-exemplo/e2e/tsconfig.e2e.json (213 bytes)
```

## Executando a aplicação

Para executar a aplicação, execute os comandos:

```bash
cd app-exemplo
ng serve --open
```

O comando `ng serve` executa um servidor Web local e "observa" os arquivos da sua aplicação, reconstruindo-a sempre que um arquivo é modificado (*hot-reload*). 

A flag `--open` vai abrir automaticamente um browser no endereço: ```http://localhost:4200/```.

Você deverá ver algo como:

![](img/app-works.png)

Modifique o arquivo `src/app/app.component.ts`:

```javascript
export class AppComponent {
    title = 'My First Angular App';
}
```

Abra o arquivo `src/app/app.component.css` e inclua a seguinte regra de estilo CSS:

```css
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```

O resultado esperado é:

![](img/my-first-app.png)


## Referências

* Angular CLI: [https://cli.angular.io/](https://cli.angular.io/)

## Próximo passo

[Exercício 03](exercicio-03.md)
