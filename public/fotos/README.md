# 📸 Organização de Imagens - TudoAgro

Esta pasta contém todas as imagens utilizadas no projeto TudoAgro, organizadas por categoria.

## 📁 Estrutura de Pastas

```
public/fotos/
├── animais/          # Imagens de animais (gado, cavalos, etc.)
├── leiloes/          # Imagens de leilões
├── produtos/         # Imagens de produtos agropecuários
└── tudo-agro-logo.png
```

## 🖼️ Como Usar as Imagens

### 1. **Caminho Correto**
Sempre use o caminho que começa com `/` (barra) para acessar imagens da pasta `public`:

```javascript
// ✅ Correto
image: "/fotos/animais/touro-nelore.jpeg"
image: "/fotos/leiloes/leilao-nelore.jpeg"
image: "/fotos/produtos/racao-gado.jpeg"

// ❌ Incorreto
image: "public/fotos/animais/touro-nelore.jpeg"
image: "./fotos/animais/touro-nelore.jpeg"
```

### 2. **Exemplos de Uso**

#### Animais
```javascript
const featuredProducts = [
  {
    id: 1,
    title: "Touro Nelore PO Certificado",
    image: "/fotos/animais/touro-nelore.jpeg",
    // ... outros campos
  }
]
```

#### Leilões
```javascript
const liveAuctions = [
  {
    id: 1,
    title: "Leilão Fazenda Santa Rita",
    image: "/fotos/leiloes/leilao-nelore.jpeg",
    // ... outros campos
  }
]
```

#### Produtos
```javascript
const featuredProductsAgro = [
  {
    id: 1,
    title: "Ração para Gado",
    image: "/fotos/produtos/racao-gado.jpeg",
    // ... outros campos
  }
]
```

## 📝 Convenções de Nomenclatura

- Use nomes descritivos em português
- Use hífen para separar palavras
- Use extensão `.jpeg` ou `.jpg`
- Exemplos:
  - `touro-nelore.jpeg`
  - `egua-mangalarga.jpeg`
  - `vaca-holandesa.jpeg`
  - `racao-gado.jpeg`
  - `sementes-milho.jpeg`
  - `fertilizante-npk.jpeg`

## 🎯 Dicas

1. **Otimização**: Comprima as imagens antes de adicionar ao projeto
2. **Tamanho**: Use imagens com resolução adequada (400x300px é um bom padrão)
3. **Formato**: Prefira JPEG para fotos e PNG para imagens com transparência
4. **Organização**: Mantenha as imagens organizadas nas pastas corretas

## 🔄 Atualizando Imagens

Para adicionar uma nova imagem:

1. Coloque a imagem na pasta correta (`animais/`, `leiloes/`, ou `produtos/`)
2. Atualize o código para usar o novo caminho
3. Teste se a imagem aparece corretamente no navegador

## 🚀 Exemplo Completo

```javascript
const liveAuctions = [
  {
    id: 1,
    title: "Leilão Fazenda Santa Rita - Elite Nelore",
    type: "Gado de Corte",
    currentBid: 15000,
    participants: 47,
    timeLeft: "2h 45m",
    image: "/fotos/leiloes/leilao-nelore.jpeg", // ← Caminho correto
    location: "Goiás, GO"
  }
]
```