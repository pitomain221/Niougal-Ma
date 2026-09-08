const products=[
{name:"Tomates",price:500,unit:"kg",icon:"🍅",category:"Légumes"},
{name:"Carottes",price:1000,unit:"kg",icon:"🥕",category:"Légumes"},
{name:"Chou",price:500,unit:"unité",icon:"🥬",category:"Légumes"},
{name:"Oignons",price:700,unit:"kg",icon:"🧅",category:"Légumes"},
{name:"Pommes de terre",price:800,unit:"kg",icon:"🥔",category:"Légumes"},
{name:"Poivrons",price:1200,unit:"kg",icon:"🫑",category:"Légumes"},
{name:"Concombre",price:700,unit:"kg",icon:"🥒",category:"Légumes"},
{name:"Piment",price:500,unit:"portion",icon:"🌶️",category:"Épices"},
{name:"Ail",price:1500,unit:"kg",icon:"🧄",category:"Épices"},
{name:"Salade",price:300,unit:"botte",icon:"🥗",category:"Légumes"}
];
let cart=JSON.parse(localStorage.getItem("niougalCart")||"[]");
let activeCategory="Tous";
const grid=document.getElementById("productGrid"),search=document.getElementById("searchInput");
const format=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function renderProducts(){
const q=search.value.toLowerCase();
grid.innerHTML=products.filter(p=>(activeCategory==="Tous"||p.category===activeCategory)&&p.name.toLowerCase().includes(q)).map((p,i)=>`<article class="product-card"><div class="product-image">${p.icon}</div><div class="product-info"><h3>${p.name}</h3><div class="price">${format(p.price)} <span class="unit">/ ${p.unit}</span></div><button onclick="addToCart(${i})">+ Ajouter</button></div></article>`).join("")||"<p>Aucun produit trouvé.</p>";
}
function addToCart(index){const p=products[index];const item=cart.find(x=>x.name===p.name);if(item)item.qty++;else cart.push({...p,qty:1});save();showToast(p.name+" ajouté au panier");}
function save(){localStorage.setItem("niougalCart",JSON.stringify(cart));renderCart();}
function renderCart(){const box=document.getElementById("cartItems");const count=cart.reduce((s,i)=>s+i.qty,0);document.getElementById("cartCount").textContent=count;document.getElementById("cartCountLarge").textContent=count+(count>1?" articles":" article");if(!cart.length){box.innerHTML='<p class="empty-cart">Votre panier est vide.<br>Ajoutez des légumes pour commencer.</p>';document.getElementById("cartTotal").textContent="0 FCFA";return}box.innerHTML=cart.map((i,n)=>`<div class="cart-item"><div><strong>${i.icon} ${i.name}</strong><div class="cart-controls"><button onclick="changeQty(${n},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${n},1)">+</button></div></div><strong>${format(i.price*i.qty)}</strong></div>`).join("");document.getElementById("cartTotal").textContent=format(cart.reduce((s,i)=>s+i.price*i.qty,0));}
function changeQty(n,d){cart[n].qty+=d;if(cart[n].qty<=0)cart.splice(n,1);save();}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);}
document.getElementById("categories").addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;activeCategory=e.target.dataset.category;document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");renderProducts();});
search.addEventListener("input",renderProducts);
document.getElementById("addCustom").onclick=()=>{const t=document.getElementById("customRequest");if(!t.value.trim())return showToast("Décrivez votre demande.");cart.push({name:"Demande personnalisée",price:0,unit:"à confirmer",icon:"📝",qty:1,description:t.value.trim()});t.value="";save();showToast("Demande personnalisée ajoutée");};
document.getElementById("checkoutBtn").onclick=()=>cart.length?showToast("Prochaine étape : adresse de livraison."):showToast("Ajoutez au moins un produit.");
renderProducts();renderCart();