# Exercício 05

## Objetivos

* Refatorar a aplicação para o uso de vários componentes

## Duração

45 minutos

## Preparando o ambiente

>Esse exercício evolui o Exercício 4. Se não conseguiu terminá-lo, use a versão que está na pasta `./workspace/exercicio-04-master-details/`

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

## Criando um componente para exibir os detalhes de um herói

Nesse momento, o componente `AppComponent` está fazendo tudo!

No começo, o componente exibia os detalhes de um herói. Agora, já implementa o padrão mestre/detalhe de heróis. No futuro, teremos novos requisitos e funcionalidades.

Já dá pra perceber que é inviável manter tudo em um só componente. Vamos, portanto, refatorar a aplicação em sub-componentes, de forma que cada componente terá uma única responsabilidade. Eventualmente, o componente `AppComponent` será somente uma “casca” para os sub-componentes.

Vamos então começar criando um componente para exibir os detalhes de um herói.

A nomenclatura de componentes deve seguir os padrões definidos no guia de estilo do Angular:

* O nome do componente deve seguir o padrão **upper camel case** com o sufixo **Component**. Ex: `UpperCamelCaseComponent` ou `FormListComponent`.
* O nome do arquivo deve seguir o padrão **lower dash case** e ter a extensão **.component.ts**. Ex.: `lower-dash-case.component.ts` ou `form-list.component.ts`.

Seguindo esse padrão, crie um novo arquivo chamado `hero-detail.component.ts` na pasta `src/app/`. Esse arquivo irá conter a implementação do novo componente `HeroDetailComponent`.

Comece a implementar o componente com o conteúdo abaixo:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'hero-detail',
})
export class HeroDetailComponent { }
```

Para definir um componente Angular, você sempre irá importar o símbolo **Component**.

O decorador `@Component` define os metadados do componente. Por exemplo, no código acima, a propriedade **selector** define que o componente será identificado por uma tag HTML nova, chamada "hero-detail". Ou seja, será identificado por `<hero-detail> </hero-detail>`.

Sempre exporte o componente, porque sempre iremos importá-lo em algum outro lugar.

!!! success "DICA: adicione novos prefixos além do `app-*`"

    No arquivo `src/tslint.json` você pode adicionar outros prefixos para suas diretivas e componentes.
    Para não recebermos erros de _lint_ com os hero's components, basta modificar as regras do item `"component-selector"`.
    No nosso caso, subistituímos a _string_ `"app"` pelo _array_ `["app", "hero"]`

### Template do componente `HeroDetailComponent`

Seguindo o padrão de nomenclatura _lower-dash-case_, crie um arquivo HTML que será o template do componente `HeroDetailComponent`. Ou seja, crie o arquivo `hero-detail.component.html`

Recorte e cole o conteúdo do template do componente `AppComponent` referente ao detalhe do herói no novo arquivo criado.

Agora, no arquivo do `hero-detail.component.ts`, informe ao componente angular o arquivo de templete deste componente. Ou seja, declare a propriedade `templateUrl` com o valor `./hero-detail.component.html`.

O componente `HeroDetailComponent` possui um herói (e não um herói "selecionado"); por isso, substitua a palavra `selectedHero` por `hero` no template do novo componente (`hero-detail.component.html`).

O novo template (`hero-detail.component.html`) deve ser algo como:

```html
<div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div>id: {{hero.id}}</div>
    <div>
        <label for="hero-name">Nome:</label>
        <input id="hero-name" placeholder="Nome do herói" [(ngModel)]="hero.name">
    </div>
</div>
```

E o decorador do novo component (`hero-detail.component.ts`) deve ser algo como

```javascript
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
```

E agora não deve ter mais nenhuma referência aos detalhes do herói no template do `AppComponent`.

### Adicionando a propriedade `hero`

O template do componente `HeroDetailComponent` faz um binding com a propriedade `hero`. Por isso, adicione essa propriedade ao componente:

```javascript
export class HeroDetailComponent {
  hero: Hero; // <-- adicione esta propriedade
}
```

A propriedade é do tipo `Hero`. Essa classe ainda está definida no arquivo `app.component.ts`. Agora, já são dois componentes que precisam referenciar a classe `Hero`.

Por isso, mova a classe `Hero` do arquivo `app.component.ts` para seu próprio arquivo `hero.ts`, na pasta `src/app`, com o conteúdo:

```javascript
export class Hero {
  id: number;
  name: string;
}
```

Definir somente uma classe por arquivo é uma **boa prática** recomendada pelo guia de estilo do Angular.

Agora que definimos a classe `Hero` em seu próprio arquivo, vamos importá-la nos componentes `AppComponent` e `HeroDetailComponent`.

Adicione o `import` no topo dos arquivos `app.component.ts` e `hero-detail.component.ts`:

```javascript
import { Hero } from './hero';
```

### A propriedade `hero` é uma propriedade de input

Ao final desse exercício, o componente `AppComponent` irá dizer ao componente filho `HeroDetailComponent` qual herói deve ser exibido, fazendo um binding entre a sua propriedade `selectedHero` e a propriedade `hero` do `HeroDetailComponent`.

Esse binding terá a seguinte forma:

```html
<hero-detail [hero]="selectedHero"></hero-detail>
```

A expressão `[hero]="selectedHero"` indica que a propriedade `hero` é o alvo da expressão. Para isso funcionar, é preciso dizer ao Angular que o alvo da expressão é uma propriedade de *input*.

Para isso, primeiro importe o símbolo `Input` da biblioteca `@angular/core` no componente `HeroDetailComponent`:

```javascript
import { Component, Input } from '@angular/core';
```

Depois, inclua o decorador `@Input()` à propriedade `hero`:

```javascript
@Input() hero: Hero;
```

É isso! A propriedade `hero` é a única coisa definida na classe `HeroDetailComponent`:

```javascript
export class HeroDetailComponent {
  @Input() hero: Hero;
}
```

Tudo que o componente faz é receber um objeto do tipo `Hero` (através da sua propriedade de input `hero`) e exibe os seus detalhes (fazendo um binding de propriedade no template).

Essa é a  versão completa do componente `HeroDetailComponent`:

```javascript
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
```

## Declarando o `HeroDetailComponent`

Todo componente deve ser declarado em **um (e somente em um)** módulo Angular para poder ser utilizado.

Por isso, abra o arquivo `app.module.ts` e importe o novo componente `HeroDetailComponent`:

```javascript
import { HeroDetailComponent } from './hero-detail.component';
```

Depois, adicione o componente ao array `declarations` do `AppModule`:

```javascript
declarations: [
  AppComponent,
  HeroDetailComponent
],
```

De uma forma geral, o array `declarations` define uma lista dos componentes, pipes e diretivas que pertencem ao módulo. Para que um componente possa ser referenciado por outros componentes, ele precisa ser declarado.

Nesse momento, o módulo `AppModule` declara os dois únicos componentes da aplicação: `AppComponent` e `HeroDetailComponent`.

## Adicionando o `HeroDetailComponent` ao `AppComponent`

Agora que delegamos a responsabilidade de exibir os detalhes de um herói ao componente `HeroDetailComponent`, precisamos refatorar o `AppComponent` para usar o novo componente.

Lembre-se que definimos o `selector` do componente `HeroDetailComponent` como `hero-detail`. Esse é o nome da tag customizada que representa o componente.

Por isso, vamos adicionar uma tag `<hero-detail>` no template do componente `AppComponent`, onde exibíamos os detalhes do herói antes da refatoração.

Para coordenar a interação entre os componentes, fazemos um binding da propriedade `selectedHero` do componente `AppComponent` com a propriedade `hero` do componente `HeroDetailComponent`, como abaixo:

```html
<hero-detail [hero]="selectedHero"></hero-detail>
```

A versão atualizada do template do `AppComponent` (`app.component.html`) deve ser algo como:

```html
<h1>{{title}}</h1>

<h2>Meus heróis</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>

<hero-detail [hero]="selectedHero"></hero-detail>
```

## O que mudou?

Revisite a aplicação. Para o usuário final, nada mudou: a aplicação continua exibindo uma lista selecionável de heróis, e toda vez que um herói é selecionado, os detalhes do herói escolhido são exibidos no padrão mestre/detalhe.

No entanto, ao refatorar o `AppComponent` em dois componentes, nós ganhamos os seguintes benefícios:

* Simplificamos o `AppComponent`, reduzindo suas responsabilidades.
* Podemos evoluir o `HeroDetailComponent` sem nos preocupar com o `AppComponent`.
* Podemos evoluir o `AppComponent` sem nos preocupar com o `HeroDetailComponent`.
* Podemos reusar o `HeroDetailComponent` em outros componentes.

## Revisando a estrutura da aplicação

Nesse momento, a sua aplicação deve ter a seguinte estrutura:
```
app-exemplo/
├── node_modules
│   ├── ...
├── package.json
├── src/
│   ├── app/
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── hero-detail.component.html
│   │   ├── hero-detail.component.ts
│   │   └── hero.ts
│   ├── ...
│   ├── main.ts
│   ├── styles.css
│   ├── ...
```

## Resumo

* Criamos um componente reusável.
* Aprendemos a usar um componente que recebe uma entrada de dados.
* Aprendemos a declarar um componente em um módulo Angular.
* Aprendemos a fazer um binding entre um componente pai e um componente filho.

## Próximo passo

[Exercício 06](exercicio-06.md)
