# Exercício 06

## Objetivos

* Criar um serviço angular para gerenciar as informações dos heróis.

## Duração

45 minutos

## Preparando o ambiente

>Esse exercício evolui o Exercício 5. Se não conseguiu terminá-lo, use a versão que está na pasta `./workspace/exercicio-05-master-details-refactored/`

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

## Criando um serviço de heróis

Na medida em que a aplicação do **_Tour of Heroes_** evolui, novos componentes vão usar as informações a respeito dos heróis

Ao invés de copiar e colar o mesmo código, vamos criar um serviço reutilizável, que será injetado nos componentes.

Separar os dados em serviços é uma **boa prática**, já que deixamos os componentes mais limpos e focados na visão. Além disso, fica mais fácil testar os componentes, já que podemos usar _mocks_ dos serviços e focar nos testes unitários do componente propriamente dito.

### Criando o `HeroService`

Nesse momento, o `AppComponent` define um _mock_ de heróis para exibição. No entanto, definir os heróis não deveria ser uma responsabilidade desse componente.

Por isso, crie um arquivo `hero.service.ts` na pasta `src/app` com o conteúdo:

```javascript
// src/app/hero.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
}
```

A nomenclatura do serviço e do arquivo devem seguir a convenção do Angular:

* O nome do arquivo deve seguir o padrão **lower dash case** com o sufixo **.service.ts**.
* O nome da classe deve seguir o padrão **upper camel case** com o sufixo **Service**.

Por exemplo, o nome do arquivo para o serviço **SpecialSuperHeroService** seria **special-super-hero.service.ts**.

### O decorador `Injectable`

Note que importamos o símbolo **Injectable** da biblioteca **@angular/core**, e o usamos como um decorador da classe `HeroService`.

O decorador `@Injectable()` é um metadado do serviço. Esse metadado especifica que o Angular pode usar a classe `HeroService` através do injetor de dependências. É opcional em alguns casos, como no caso de não haver dependências no serviço.

Apesar de o `HeroService` não possuir nenhuma dependência nesse momento, é uma boa prática declarar o decorador `@Injectable()` desde o começo.

**ATENÇÃO**: A propriedade `providedIn: 'root'` é uma novidade do **angular 6**. Ela possibilita registrarmos o serviço como "global" sem precisar declarar no módulo principal (Ex.: `AppModule`).


### Recuperando os dados dos heróis

Remova o construtor do serviço (não vamos precisar mexer nele agora) e adicione um _stub_ para o método `getHeroes()`, ficando assim:

```javascript
// src/app/hero.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): void {}
}

```

O serviço poderia recuperar a lista de heróis de qualquer lugar: um web service, o _LocalStorage_ do navegador, um data source mock e etc..

Ao remover a responsabilidade de acesso aos dados dos componentes para um serviço, podemos mudar a forma de recuperar os dados sem de fato mexer nos componentes que utilizam o serviço.

### Isolando os dados para o serviço

Mova o array `HEROES` do `app.component.ts` para um novo arquivo `mock-heroes.ts` na pasta `src/app`.

O conteúdo do novo arquivo deverá ser como abaixo:

```javascript
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Spider-Man' },
  { id: 12, name: 'Captain America' },
  { id: 13, name: 'Hulk' },
  { id: 14, name: 'Thor' },
  { id: 15, name: 'Iron Man' },
  { id: 16, name: 'Luke Cage' },
  { id: 17, name: 'Doctor Strange' },
  { id: 18, name: 'Daredevil' },
  { id: 19, name: 'Ant-Man' },
  { id: 20, name: 'Wolverine' }
];
```

Perceba que importamos a classe `Hero`, já que o array usa esse tipo.

Note também que exportamos o array, para que ele possa ser utilizado em outros lugares (iremos utilizá-lo no `HeroService`).

No `app.component.ts`, remova a inicialização da propriedade `heroes`e defina seu tipo:

```javascript
heroes: Hero[];
```

### Retornando os heróis mock

De volta ao serviço `HeroService`, importe o array `HEROES` e o retorne no método `getHeroes()`.

Nesse momento, o `HeroService` deve ter o seguinte conteúdo:

```javascript
import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Hero[] {
    return HEROES;
  }
}
```

### Importando o `HeroService`


!!! warning "ATENÇÃO: Angular 6"

    Agora no Angular 6, os serviços com a propriedade `providedIn: 'root'` não precisam ser importadas nos módulos.
    Qualquer dúvida, **pergunte**!


### Não crie uma instância do `HeroService` com `new`!

Por se tratar uma classe, poderíamos criar uma nova instância do `HeroService` com `new`, conforme o exemplo abaixo:

```javascript
heroService = new HeroService(); // NÃO faça isso!
```

No entanto, essa não é a opção ideal pelos seguintes motivos:

* Dessa forma, o componente precisaria saber como criar um `HeroService`. Se o construtor do serviço mudar, você precisa modificar todos os componentes que o usam.
* Toda vez que você usa o `new`, uma nova instância é criada. Isso dificultaria o compartilhamento de um cache de heróis, por exemplo.
* Você está se "prendendo" a uma implementação específica de um `HeroService`. Trocar a implementação do serviço (usar um serviço mock para testes unitários, por exemplo) é mais custoso.

### Injetando o `HeroService`

Ao invés de instanciar o serviço com o `new`, vamos injetar o `HeroService` no componente.

Para isso, adicione o seguinte contrutor no `AppComponent`:

```javascript
constructor(private heroService: HeroService) { }
```

Apesar de o construtor em si não fazer nada, o parâmetro `heroService` está simultaneamente definindo uma propriedade privada chamada `heroService` e identificando essa propriedade como um ponto de injeção de um `HeroService`.

Dessa forma, o Angular sabe que deve fornecer uma instância do serviço `HeroService` sempre que criar uma instância do componente `AppComponent`.

### Chamando o `getHeroes()` no `AppComponent`

Agora que o `heroService` é uma propriedade privada do `AppComponent`, podemos recuperar a lista de heróis simplesmente chamando o método do serviço:

```javascript
this.heroes = this.heroService.getHeroes();
```

Portanto, crie agora um novo método `getHeroes()` para encapsular essa chamada no componente `AppComponent`:

```javascript
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

### O método `ngOnInit`

O componente `AppComponent` já consegue recuperar a lista de heróis usando o serviço `HeroService`. Mas quando devemos recuperar os dados?

Como queremos que a lista de heróis seja exibida assim que o componente seja carregado, poderíamos fazer a chamada ao método `getHeroes()` dentro do construtor do `AppComponent`. No entanto, sabemos que um construtor não deve conter uma lógica complexa e não deve depender de serviços externos. O construtor deve ser usado para inicializações simples, como setar o valor de propriedades privadas a partir dos parâmetros informados.

Para chamar o `getHeroes()`, então, você pode usar o método `ngOnInit`.

O `ngOnInit` é um método do **lifecycle hook** do Angular. Esses métodos do **lifecycle hook** são métodos especiais que permitem que a aplicação atue em momentos críticos no ciclo de vida de um componente (na criação, após cada mudança e na destruição do componente).

Cada momento é representado por uma interface com um único método. Quando o componente implementa uma dessas interfaces, o Angular chama o método no momento apropriado.

Para implementar o método `ngOnInit`, você deve seguir a seguinte estrutura básica:

```javascript
import { OnInit } from '@angular/core'; // (1) importe o símbolo "OnInit"

export class AppComponent implements OnInit {  // (2) implemente a interface "OnInit"
  ngOnInit(): void {  // (3) adicione o método "ngOnInit()"
  }
}
```

De volta ao `AppComponent`, adicione a implementação da interface `OnInit` da declaração da classe:

```javascript
export class AppComponent implements OnInit {}
```

Depois disso, implemente o método `ngOnInit()` com a lógica de inicialização da lista de heróis. O Angular irá chamar esse método no momento apropriado:

```javascript
ngOnInit(): void {
  this.getHeroes();
}
```

<!-- TODO: (SUGESTÃO) dividir esse exercício até aqui. Deixar a parte das Promises separado. -->

## Serviços assíncronos

Nesse momento, o `HeroService` retorna uma lista de heróis mock imediatamente, e a assinatura do método `getHeroes()` é síncrona.

Na vida real, as informações a respeito dos heróis serão recuperadas a partir de uma API em um servidor remoto.

Nesse cenário, é importante que os usuários não esperem pela resposta do servidor. Por isso, você não deve bloquear a interface durante a espera pela resposta.

Para coordenar a visão com a resposta do servidor remoto, vamos usar uma `Promise` (ES2015). Basicamente, uma `Promise` é uma técnica assíncrona que representa a promessa de que uma função *callback* será chamada quando o resultado estiverem prontos. Você solicita a um serviço assíncrono a execução de um trabalho e dá a ele uma função callback. O serviço faz o trabalho e eventualmente chama a função callback com os resultados (ou um erro).

### O `HeroService` faz uma promessa

Atualize o método `getHeroes()` do serviço `HeroService` para devolver uma `Promise`:

```javascript
getHeroes(): Promise<Hero[]> {
  return Promise.resolve(HEROES);
}
```

Perceba que ainda estamos usando os dados mock. Nessa simulação, o nosso servidor remoto tem latência zero e devolve uma promessa com resolução imediata do array `HEROES`.

### Respondendo à promessa

Como consequência da mudança no `HeroService`, devemos modificar o método `getHeroes` do `AppComponent`, já que o retorno não é mais um array de heróis, mas sim uma promessa.

A versão anterior do método era algo como:

```javascript
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

A nova versão do método deve agir quando a promessa responder, isto é, devemos passar uma função de callback como um argumento do método `then()` da `Promise`:

```javascript
getHeroes(): void {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
}
```

A função callback está usando a sintaxe **Arrow function** (ES2015), que é mais sucinta que a expressão `function` equivalente e ainda permite o uso do `this`.

Essa função callback seta a propriedade `heroes` do componente `AppComponent` com o valor do array retornado pelo serviço `HeroService`.

Volte para o navegar e verifique que a aplicação está rodando normalmente e respondendo à seleção do usuário como anteriormente.

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
│   │   ├── hero.service.ts
│   │   ├── hero.ts
│   │   └── mock-heroes.ts
│   ├── ...
│   ├── main.ts
│   ├── styles.css
│   ├── ...
├── angular.json
├── package.json
|-- ...
```

## Resumo

* Criamos uma classe de serviço que pode ser reutilizada por vários componentes.
* Usamos o ngOnInit para inicializar a lista de heróis.
* Projetamos o serviço para retornar uma promessa (mesmo que ainda usando mocks).
* Projetamos o componente para agir no retorno dessa promessa.

## Próximo passo

[Exercício 07](exercicio-07.md)
