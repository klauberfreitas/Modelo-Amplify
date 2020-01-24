# Modelo de Autenticação AWS Amplify + AWS Cognito em React Native (Expo) 

Experiência de autenticação completa para aplicativos construídos em React Native: 
* Framework: [React Native](https://facebook.github.io/react-native/).
* Navegação: [React-navigation](https://reactnavigation.org/).
* Lib: [Expo](https://docs.expo.io/versions/latest/workflow/expo-cli/).
* Front-end: [Interface simples](https://klauberfreitas.github.io/).
* Back-end (Autenticação): [AWS Amplify](https://aws-amplify.github.io/).

### Por que?
    Comecei a estudar React Native em *outubro de 2019* e me deparei com dúvidas das quais sempre encontrei as respostas através de outros usuários. 
    Até que não encontrei um método de usar o `AWS Amplify` com componentes personalizados. Então decidi criar esse repositório com intuito de também
    ajudar outras pessoas que encontram as mesmas dúvidas que eu. 


## Fluxo de autenticação

![Visão Geral](https://user-images.githubusercontent.com/10797704/73019691-dd302c80-3e02-11ea-8e10-d0f6e1854eb6.png)

* Usuários entram e vêem a tela inicial (WelcomeScreen - AuthStack)
* Os usuários podem se cadastrar, entrar, solicitar alteração de senha, navegar entre as telas (AuthStack).
* Input com DDD internacional selecionável na tela de cadastro. 
* Modal com verificação do código de cadastro. 
* Os usuários são redirecionados para a tela inicial (Home - AppStack) após o login.
* Os usuários podem navegar entre as telas usando o navegador o menu inferior (bottomTabNavigator)
* Os usuários são mantidos conectados até que saiam do aplicativo. 
* Alertas de confirmação em todas as ações do aplicativo.


## Pré-requisitos

* [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)
  * `npm install -g expo-cli`
* [Conta AWS](https://aws.amazon.com/amplify/)
* [Node JS 10+](https://nodejs.org/en/download/) 
* [NPM 5+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

`ATENÇÃO: Instale somente o AWS CLI e siga os próximos passos. Caso contrário você encontrará diversos erros.`
* [AWS Amplify CLI](https://aws-amplify.github.io/docs/js/react)
  * `npm install -g @aws-amplify/cli`

## Configurando o projeto 

### 1. Configure sua conta AWS Amplify. 

```sh
$ amplify configure
```

#### 2. Clone o repositório para sua máquina e entre nele:

```sh
$ git clone https://github.com/oikabin/Modelo-Amplify.git
```
```sh
$ cd Modelo-Amplify
```

#### 3. Inicio o Amplify | Tenha certeza de estar no diretório do app

```sh
$ amplify init
```
Siga as mesma configurações da imagem abaixo:
![Amplify init](https://user-images.githubusercontent.com/10797704/73017559-d0113e80-3dfe-11ea-99fa-67d2491deeaf.PNG)


### 4. Configure uma conta Amazon Cognito para armazenar as informações dos usuários

```sh
$ amplify add auth
```
![Amplify add auth](https://user-images.githubusercontent.com/10797704/73017680-f9ca6580-3dfe-11ea-943d-d0d35399f58f.PNG)


### 5. Hora de implantar seu projeto na AWS

```sh
$ amplify push
```

![Amplify push](https://user-images.githubusercontent.com/10797704/73017807-2e3e2180-3dff-11ea-82fe-cce30ca06ef7.PNG)

Após alguns minutos a CLI do Amplify criará um "pool" de usuários e um conjunto de identidades do Amazon Cognito para armazenar as credenciais dos usuários.

## Executando o aplicativo

### 1. Instale as dependências:

```sh
$ yarn 
`ou`
$ npm install
```

### 2. Rode o expo no seu celular usando o "Expo app" ou rode em um simulador Android ou iOS:

```sh
$ expo start
$ expo start --ios 
$ expo start --android 
```

## Licença

MIT © [Klauber Freitas](https://github.com/klauberfreitas)





