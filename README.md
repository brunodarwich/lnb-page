# Lá na Brasília — Landing Page Oficial

Esta pasta contém o código-fonte da **landing page oficial** do projeto **Lá na Brasília** (publicado em `lanabrasilia.com.br`), servindo como ponto de encontro, apresentação institucional e cadastramento pré-lançamento para moradores e pequenos empreendedores do bairro Brasília, em Altamira - PA.

---

## 🚀 O Projeto

O **Lá na Brasília** organiza e distribui a energia, o comércio e as informações do bairro Brasília em um espaço digital simples, acessível e moderno. Através de um aplicativo leve para o celular, a comunidade poderá interagir com a vizinhança, valorizar o comércio local e acessar um assistente inteligente.

---

## 🎨 Estrutura e Funcionalidades Implementadas

A landing page foi desenvolvida utilizando **HTML5 semântico, JavaScript moderno (Vanilla) e Tailwind CSS** via CDN, com foco em uma experiência estética premium, design responsivo de alta fidelidade e micro-animações interativas.

### 1. Início (`index.html`)
- **Hero Principal**: Apresentação de impacto com formulário de cadastro pré-lançamento para recebimento de novidades via e-mail.
- **Seção "Tudo o que o bairro oferece"**: Exibição dos pilares do aplicativo em cards interativos com efeitos hover personalizados.
- **Mockup e Funcionalidades**: Demonstração visual do aplicativo mobile integrada a cards informativos de usabilidade.
- **Mapa Interativo do Bairro**: Um mapa geográfico completo alimentado por **Leaflet.js** que plota **479 estabelecimentos reais** do bairro Brasília, distribuídos de forma categorizada por cores e ícones interativos.
- **Status do Lançamento**: Banner de contagem regressiva apontando para o dia **8 de Agosto de 2026**.

### 2. Sobre a Proposta (`sobre.html`)
- **Banner Hero Full-Width**: Banner no topo que se estende por 100% da largura da tela, exibindo uma bela foto do amanhecer do bairro (`img-sobre.jpeg`) em alto contraste.
- **Frase de Impacto Centralizada**: Destaque especial e isolado sobre a missão do projeto digital.
- **Apresentação em Cards**: Descrição do funcionamento da proposta organizada em um grid de cards 2x2 com ícones explicativos.
- **Caixa de Cadastro Centralizada**: Formulário de coleta de e-mail centralizado e totalmente integrado ao serviço de inscrição.
- **Idealizadores**: Cards biográficos refinados de Bruno Darwich e Raíssa Rocha.

### 3. Contato e Suporte (`contato.html`)
- **Seção Full-Width Imersiva**: A página inteira é envolvida por um fundo fotográfico (`img-contato.jpeg`) sob uma película de contraste escura, gerando um efeito visual premium e de altíssimo refinamento.
- **Cartão Glassmórfico de Canais**: Canais de atendimento por e-mail e localização física exibidos em um container translúcido sofisticado com efeito de vidro fosco (`backdrop-blur-md`).
- **Perguntas Frequentes (FAQs)**: Seção compacta e elegante respondendo às principais dúvidas sobre gratuidade e cadastro de novos estabelecimentos.

---

## 📂 Organização dos Arquivos

A estrutura do projeto está organizada de forma modular e otimizada:

```text
lnb-page/
├── assets/
│   ├── images/               # Mockups, ícones e imagens estáticas de apoio
│   └── js/
│       └── merchants_compressed.js  # Banco de dados compactado dos 479 estabelecimentos do mapa
├── docs/
│   └── narrativa.md          # Diretrizes e narrativas fundamentais do projeto
├── img-sobre.jpeg            # Foto oficial da página sobre (rua do bairro ao amanhecer)
├── img-contato.jpeg          # Foto oficial da página de contato (fundo da seção completa)
├── index.html                # Página inicial pública com o mapa interativo
├── sobre.html                # Página explicativa institucional
├── contato.html              # Página de suporte e canais oficiais
├── privacidade.html          # Termos de Privacidade de acordo com a LGPD
├── termos.html               # Termos de Uso do site
├── vercel.json               # Configurações de redirecionamento e deploys na Vercel
├── README.md                 # Este documento de documentação técnica
└── package.json              # Metadados e dependências básicas do projeto
```

---

## 💻 Execução Local

Para visualizar e testar o projeto localmente, basta iniciar um servidor HTTP estático simples na pasta raiz do projeto.

### Usando o VS Code Live Server:
1. Abra a pasta `lnb-page` no VS Code.
2. Clique no botão **"Go Live"** no canto inferior direito.

### Usando Python:
```bash
python -m http.server 8000
```
Acesse no navegador: `http://localhost:8000`

---

## 🔒 Segurança e Privacidade
O site conta com páginas de **Termos de Uso** e **Políticas de Privacidade** estruturadas em conformidade com as diretrizes da LGPD (Lei Geral de Proteção de Dados), garantindo a integridade e segurança de todos os e-mails e contatos enviados no formulário de pré-lançamento.
