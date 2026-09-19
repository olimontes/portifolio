# Frank Montes — direção visual

Adaptação da referência AuthKit exportada do [Refero Styles](https://styles.refero.design/style/e80231a2-e4d6-406a-a2c9-2e6109679690) para um portfólio pessoal de desenvolvimento backend e web.

## Intenção

Apresentar Frank e dar destaque a seus projetos reais, especialmente Era Prata que Faltava e Ranking da Peteca de Bocaiuva. A referência orienta a linguagem visual; componentes de autenticação, textos comerciais e marcas do AuthKit não fazem parte do portfólio.

## Arquivos

- `variables.css`: tokens de cor, fonte, espaçamento, raio e elevação adaptados da exportação.
- `theme.css`: nomes semânticos para o portfólio, em CSS nativo. Substitui a diretiva `@theme` do arquivo original, que exigia Tailwind.
- `tokens.json`: versão estruturada dos tokens, com a origem preservada e a adaptação registrada.
- `styles.css`: composição, componentes e comportamento responsivo.
- `script.js`: interação 3D, escolha de prévias, filtros, movimento e cópia de e-mail.

## Paleta e superfícies

| Papel | Valor |
| --- | --- |
| Fundo | `#05060f` |
| Superfície de vidro | `rgba(186, 214, 247, 0.03)` |
| Vidro profundo | `rgba(5, 6, 15, 0.97)` |
| Texto principal | `#d1e4fa` |
| Texto secundário | `#c7d3ea` |
| Texto discreto | `#9da7ba` |
| Contornos | `rgba(186, 215, 247, 0.12)` |
| Ação principal | `#663af3` |

O violeta fica restrito ao botão principal de explorar projetos. Elementos decorativos usam luz azulada, branco e transparências. As imagens dos projetos mantêm suas próprias cores para representar os sites reais.

A cor exportada `--surface-steel-plate: #2f343` era inválida; foi corrigida para `#2f343e`, conforme o token de cor correspondente.

## Tipografia

As famílias proprietárias da referência foram substituídas pelas alternativas sugeridas no próprio material:

- **Space Grotesk**, pesos 400–500: nome, títulos e nomes de projetos.
- **Inter**, pesos 400–600: textos e controles.
- **JetBrains Mono**, peso 400: marcadores de seção e tecnologias.

O nome Frank Montes funciona como a assinatura iluminada central. Gradientes de texto aparecem apenas no nome e nos títulos maiores. Texto corrente permanece sólido e legível.

## Composição

Fundo contínuo com grade sutil e halo frio central. Conteúdo limitado a 1200px, seções separadas por até 120px, cartões com 24px de padding e 16px de raio. Botões e filtros têm formato de pílula. Elevação por brilho interno e contornos translúcidos.

A abertura é centralizada, seguida por três prévias reais em leque 3D. A coleção de cinco projetos oferece filtros por tecnologia. Sobre e contato completam a página. A fotografia de Frank fica restrita à apresentação pessoal: uma adaptação ao contexto de portfólio, sem imagens genéricas de divulgação.

## Movimento e acesso

- As prévias mudam por seleção explícita, sem carrossel automático.
- Abas respondem a clique, toque e às teclas de seta, Home e End.
- Cartões acompanham o ponteiro com inclinação pequena e voltam à posição original ao sair.
- Toque não depende de hover; todos os projetos continuam acessíveis.
- O controle de movimento pausa os efeitos e preserva a preferência localmente.
- `prefers-reduced-motion` desativa as animações e inclinações.
- Sem JavaScript, os projetos, links, currículo e contatos continuam disponíveis.
- Prévia inativa não recebe foco; filtros informam a contagem de resultados.

## Conteúdo

Manter os links públicos confirmados pelo proprietário e não inventar métricas, clientes ou depoimentos. Era Prata e Peteca aparecem primeiro. ComplianceAI, SetLive e Banco de Talentos completam a coleção.
