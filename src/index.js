gsap.registerPlugin(ScrollTrigger);

    const produtos = [
        { nome: "VW/POLO Confortline ", preco: "R$95.990,00", info: "2023/2024", type:"flex", imagem: "./src/products/carro 1.jpg" },
        { nome: "Uno Attractive 1.0", preco: "R$53.9990,00", info: "2021/21 ",type:"flex", imagem: "./src/products/carro 2.jpg" },
        { nome: "HYUNDAI HB20S", preco: "R$72.990,00", info: "2016/16",type:"flex", imagem: "./src/products/carro 3.jpeg" },
        { nome: "FIAT STRADA", preco: "R$61.990,00", info: "2019/2020",type:"flex", imagem: "./src/products/carro 4.jpeg" },
        { nome: "CHEVROLET ONIX", preco: "R$75.990,00", info: "2022/2023",type:"", imagem: "./src/products/carro 5.jpeg" },
        { nome: "CHEVROLET CORSA", preco: "R$32.990,00", info: "2009/2010",type:"", imagem: "./src/products/carro 6.jpeg" }
    ];

    const grid = document.getElementById("products-grid");

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img class="product-image" src='${produto.imagem}';></img>
            <div class="product-price">${produto.preco}</div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <div class="info-car">
                <p>${produto.info}</p>
                <p>${produto.type}</p>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    //Header
    gsap.from("body", {
        opacity: 0,
        y: 0,
        duration: 4,
        ease: "power2.out",
        scrollTrigger:{
            trigger: ".header"
        }
    })

    // Animação dos produtos quando aparecem
    gsap.utils.toArray(".product-card").forEach(card => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            }
        });
    });

     // Marquee animado com GSAP
    document.addEventListener("DOMContentLoaded", () => {
    gsap.to(".marquee", {
        xPercent: -50, // rola metade (pois temos 2 conteúdos duplicados)
        ease: "linear",
        repeat: -1,
        duration: 15 // velocidade da animação
    });
    });

    // Hover animation nos cards
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { scale: 1.05, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
        });
    });



//obter a div do story    
const stories = gsap.utils.toArray(".story");

// posições fixas: frente, esquerda, direita
const container = document.querySelector(".stories");
const offset = container.offsetWidth * 0.4; // 40% da largura do container

const positions = [
  { x: 0,      y: 0,  scale: 1,   opacity: 1,   zIndex: 3 },  // frente
  { x: -offset,y: 20, scale: 0.8, opacity: 0.6, zIndex: 2 },  // esquerda
  { x: offset, y: 20, scale: 0.8, opacity: 0.6, zIndex: 1 }   // direita
];

// aplica posições iniciais
stories.forEach((el, i) => gsap.set(el, positions[i]));

function cycleStories() {
  // gira o array de posições (quem estava na frente vai para direita, etc.)
  positions.unshift(positions.pop());

  // anima cada story até a nova posição
  stories.forEach((el, i) => {
    gsap.to(el, {
      x: positions[i].x,
      y: positions[i].y,
      scale: positions[i].scale,
      opacity: positions[i].opacity,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => gsap.set(el, { zIndex: positions[i].zIndex })
    });
  });
}

// inicia ciclo automático
setInterval(cycleStories, 3000);


