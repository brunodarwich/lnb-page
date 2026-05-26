# lnb-page

Esta pasta e o espaco da **landing page** do La na Brasilia.

O objetivo dela e apresentar o projeto publicamente em `lanabrasilia.com.br`, enquanto o aplicativo principal fica separado em `app.lanabrasilia.com.br`.

## Papel desta pasta

Use `lnb-page` para:

- texto institucional;
- narrativa de apresentacao;
- proposta de valor;
- pagina publica do projeto;
- links para acessar o app;
- materiais comerciais ou comunitarios que expliquem o La na Brasilia.

## Arquivos atuais

```text
lnb-page/
└── narrativa.md
```

O arquivo `narrativa.md` contem a base textual da landing page. Ele pode ser usado para criar as secoes da pagina:

- hero;
- apresentacao do problema;
- explicacao do app;
- beneficios para moradores;
- beneficios para comerciantes;
- chamada para acessar o aplicativo.

## Caminho recomendado para virar site

Quando for construir a landing, esta pasta pode receber uma estrutura propria, separada do app:

```text
lnb-page/
├── index.html
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── styles.css
└── README.md
```

Ou, se a ideia for publicar uma primeira versao mais simples:

```text
lnb-page/
├── index.html
├── styles.css
└── README.md
```

## Dominio sugerido

```text
lanabrasilia.com.br       -> landing page
www.lanabrasilia.com.br   -> landing page
app.lanabrasilia.com.br   -> app principal em ../lnb-app
```

Na landing, o principal CTA deve apontar para:

```text
https://app.lanabrasilia.com.br
```

## Relacao com outras pastas

- `../lnb-app`: produto principal, nao deve ser misturado com a landing.
- `../narrativa`: laboratorio de textos e propostas completas.
- `../prototipagem`: experimentos visuais que podem inspirar a landing.

## Antes de publicar

Verifique se a landing tem:

- titulo claro do projeto;
- explicacao curta do que e o La na Brasilia;
- chamada para moradores;
- chamada para comerciantes;
- botao para abrir o app;
- informacao de bairro/cidade;
- metadados basicos de compartilhamento.
