# Exercício 03

## Objetivos

* Evoluir nossa aplicação para fazer a aplicação exemplo do Angular **Tour Of Heroes**
* Exibir os detalhes de um herói
* Criar um formulário de edição de um herói

## Duração

30 minutos

## Preparando o ambiente

>Esse exercício evolui o Exercício 2. Se não conseguiu terminá-lo, use a versão que está na pasta `./workspace/exercicio-02-helloworld/`

>Se estiver usando o GIT, para descartar alguma alteração local faça:
>```
>git reset && git checkout -- .
>```

Deixe a aplicação rodando:

```bash
cd app-exemplo
npm run start
```

O comando `npm run start` iniciará um servidor local para desenvolvimento em "_watch mode_", ou seja, qualquer edição nos arquivos, irá recompilar e recarregar a aplicação no browser. Acesse sua app no endereço local: [http://localhost:4200/](http://localhost:4200/).

## Exibindo os detalhes de um herói

Abra o arquivo `app.component.ts` e adicione duas novas propriedades:

* **title**: o nome da aplicação;
* **hero**: o herói “Hulk”;

A classe `AppComponent` deve ficar como abaixo:

```javascript
export class AppComponent {
  title = 'Tour of Heroes';
  hero = 'Hulk';
}
```

Em seguida substitua todo o conteúdo do arquivo de  template descrito no `templateUrl` do decorador `@Component` do **AppComponent** pelo conteúdo abaixo:

```html
<h1>{{title}}</h1>
<h2>{{hero}} details!</h2>
```

O navegador deve recarregar a aplicação e mostrar o **título** e o **nome do herói**.

As chaves duplas `{{}}` é a sintaxe para a **interpolação** do Angular. A interpolação apresenta as propriedades **title** e **hero** do componente **AppComponent** como strings no HTML.

### A classe Hero

O herói precisa de mais propriedades. Converta a propriedade `hero` de uma string para uma classe.

Crie a classe `Hero` com as propriedades `id` e `name` no arquivo `app.component.ts`, logo após os import:

```javascript
export class Hero {
  id: number;
  name: string;
}
```

Na classe `AppComponent`, refatore a propriedade `hero` para o tipo `Hero`, e inicialize o `id` e o `name`:

```javascript
hero: Hero = {
  id: 1,
  name: 'Hulk'
};
```

Atualize, agora, o template para mostrar as propriedades `id` e `name`:

```html
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div>id: {{hero.id}}</div>
<div>nome: {{hero.name}}</div>
```

O navegador deve recarregar a aplicação e continuar mostrando o nome do herói.

!!! warning "Templates com múltiplas linhas"

    No curos original, é apresentado o uso da propriedade `template` do decorator (ao invés da `templateUrl`).
    Porém, na prática não utilizamos esta abordagem pois pode dificultar a manutenção do código.
    Se você leu isso e o tutor(a) não explicou ainda, peça para que explique!


## Editando o nome do herói

Para editar o nome do herói, vamos usar um `<input>`. A caixa de texto deve tanto *exibir* a propriedade `name` do herói, quanto *atualizar* o valor dessa propriedade na medida em que o usuário modifica seu valor.

Isto é, precisamos de um **_two-way binding_** entre o elemento `<input>` e a propriedade `hero.name`.

!!! warning "Acessibilidade: Labels"

    Sempre que possível, use elementos de `label` para associar e descrever um campo de formulário.
    O atributo `for` do label **deve** existir e ser igual ao `id` do campo em questão.
    Referência: [Técnica H44 do WCAG 2.0](https://www.w3.org/WAI/GL/WCAG20-TECHS/html.html#H44)

### Two-way binding

Refatore o nome do herói no template para ficar como abaixo:

```html
<div>
  <label for="hero-name">Nome:</label>
  <input id="hero-name" [(ngModel)]="hero.name" placeholder="Nome do herói">
</div>
```

O `[(ngModel)]` é a sintaxe Angular para o *two-way binding* entre o elemento `<input>` e a propriedade `hero.name`. Os dados fluem nas duas direções: a partir da propriedade para a caixa de texto, e da caixa de texto para a propriedade.

Logo após essa alteração, a aplicação quebra. Se você olhar o console do navegador, você verá algo como:

```
ngModel ... isn't a known property of input.
```

Apesar do `ngModel` ser uma diretiva válida do Angular, ela não está disponível por default. Ela pertence ao módulo opcional `FormsModule`.

### Importando o FormsModule

Abra o arquivo `app.module.ts` e importe o módulo `FormsModule` da biblioteca `@angular/forms`.

Para fazer isso, adicione o `FormsModule` no array `imports` do `@NgModule`. Esse array contém a lista de todos os módulos Angular externos que a aplicação usa.

O `AppModule` deve ficar como abaixo:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Passo 1) Importe o FormsModule (javascript) 

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Passo 2) Importe o FormsModule (angular)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Quando o navegador atualizar, a aplicação deve voltar a funcionar. Você pode editar o nome do herói e ver as mudanças refletirem imediatamente no `<h2>` da página.

## Resumo

O que aprendemos:

* One-way Data Binding para a interpolação de dados (`{{}}`)
* Two-way data Binding para a edição de dados (`[(ngModel)]`)
* <del title="Motivo explicado no curso: pode dificultar a manutenção (caso geral).">Template com múltiplas linhas</del> ( ` )

Veja como deve estar o conteúdo do arquivo `app.component.ts` nesse momento:

```javascript
import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: "Hulk"
  };
}
```

E o arquivo `app.component.html` deve estar (mais ou menos) assim:

```html
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div>id: {{hero.id}}</div>
<div>
  <label for="hero-name">Nome:</label>
  <input id="hero-name" [(ngModel)]="hero.name" placeholder="Nome do herói">
</div>
```

## Revisando a estrutura da aplicação

Nesse momento, a sua aplicação deve ter a seguinte estrutura:

```
app-exemplo
├── node_modules
│   ├── ...
├── package.json
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── main.ts
│   ├── styles.css
│   ├── ...
```

## Próximo passo

[Exercício 04](exercicio-04.md)
