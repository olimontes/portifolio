# Portfólio — Frank Montes

[Abrir portfólio](https://olimontes.github.io/portifolio/)

Site estático em HTML, CSS e JavaScript. Visual adaptado da referência AuthKit / Refero, com prévias de projetos em 3D, filtros por tecnologia e suporte à preferência de reduzir movimento.

## Executar localmente

```sh
python -m http.server 5500 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:5500`. Não há etapa de build. O conteúdo e os links também funcionam sem JavaScript.

## Organização

- `index.html`: textos, projetos e links.
- `variables.css`, `theme.css` e `tokens.json`: tokens e tema adaptados.
- `styles.css`: layout, componentes e responsividade.
- `script.js`: interações e acessibilidade.
- `DESIGN.md`: referência visual e decisões de adaptação.
- `assets/`: prévias reais de Era Prata e Peteca e ícone do site.

As fontes Inter, Space Grotesk e JetBrains Mono são carregadas pelo Google Fonts, com alternativas locais caso o serviço esteja indisponível. O GitHub Pages publica a partir da branch `main`.
