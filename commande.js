let cart=JSON.parse(localStorage.getItem("niougalCart")||"[]");
const count=document.getElementById("cartCount");
function updateCount(){count.textContent=cart.reduce((s,i)=>s+(i.qty||1),0);}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300);}
document.getElementById("addCustom").addEventListener("click",()=>{
 const request=document.getElementById("request").value.trim();
 const budget=Number(document.getElementById("budget").value)||0;
 const market=document.getElementById("market").value.trim();
 if(!request){toast("Veuillez décrire ce que vous souhaitez acheter.");document.getElementById("request").focus();return;}
 cart.push({name:"Commande personnalisée",price:budget,unit:"à confirmer",icon:"📝",qty:1,description:request,market});
 localStorage.setItem("niougalCart",JSON.stringify(cart));
 updateCount();
 toast("Votre demande a été ajoutée au panier !");
 setTimeout(()=>location.href="panier.html",900);
});
updateCount();