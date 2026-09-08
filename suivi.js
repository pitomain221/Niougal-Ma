const steps=[
{key:"waiting",label:"En attente",icon:"✓"},
{key:"shopping",label:"Achat",icon:"🛒"},
{key:"preparing",label:"Préparation",icon:"📦"},
{key:"delivery",label:"Livraison",icon:"🛵"},
{key:"delivered",label:"Livrée",icon:"✓"}
];
const labels={waiting:"🟡 En attente",shopping:"🛒 Achat en cours",preparing:"📦 Préparation",delivery:"🛵 En livraison",delivered:"🟢 Livrée"};
let orders=JSON.parse(localStorage.getItem("niougalOrders")||"[]");
function format(n){return new Intl.NumberFormat("fr-FR").format(n)+" FCFA";}
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300);}
function timeline(status){const current=Math.max(0,steps.findIndex(s=>s.key===status));return '<div class="status-timeline">'+steps.map((s,i)=>'<div class="timeline-step '+(i<=current?'active ':'')+(i===current?'current':'')+'"><div class="timeline-dot">'+s.icon+'</div>'+s.label+'</div>').join('')+'</div>';}
function render(){const list=document.getElementById("ordersList"),empty=document.getElementById("emptyOrders");if(!orders.length){list.innerHTML="";empty.hidden=false;return;}empty.hidden=true;list.innerHTML=orders.map((o,i)=>{const total=(o.total||0);const items=(o.items||[]).map(x=>'<li>'+ (x.icon||"🥬")+' '+x.name+' × '+(x.qty||1)+'</li>').join("");return '<article class="order-card" data-id="'+o.id+'"><div class="order-top"><div><div class="order-id">'+o.id+'</div><div class="order-date">Commande du '+o.date+'</div></div><div class="status-pill">'+labels[o.status]+'</div></div>'+timeline(o.status)+'<div class="order-footer"><div class="order-total">Total estimatif : '+format(total)+'</div><button class="details-btn" onclick="toggleDetails('+i+')">Voir les détails</button></div><div class="order-details" id="details-'+i+'"><strong>Produits commandés :</strong><ul>'+items+'</ul><p><strong>Adresse :</strong> '+(o.address||"À confirmer")+'</p></div></article>';}).join("");}
function toggleDetails(i){document.getElementById("details-"+i).classList.toggle("show");}
function searchOrder(){const q=document.getElementById("orderSearch").value.trim().toLowerCase();if(!q){toast("Entrez un numéro de commande.");return;}const card=[...document.querySelectorAll(".order-card")].find(c=>c.dataset.id.toLowerCase()===q);if(card){card.scrollIntoView({behavior:"smooth",block:"center"});card.style.outline="3px solid #2f7d32";setTimeout(()=>card.style.outline="",1800);}else toast("Commande introuvable sur cet appareil.");}
document.getElementById("searchBtn").onclick=searchOrder;
document.getElementById("demoBtn").onclick=()=>{if(!orders.length){orders=[{id:"CMD-2026-001",date:new Date().toLocaleDateString("fr-FR"),status:"delivery",items:[{name:"Tomates",qty:2,icon:"🍅"},{name:"Oignons",qty:1,icon:"🧅"},{name:"Carottes",qty:1,icon:"🥕"}],total:3200,address:"Thiès - Adresse de démonstration"}];localStorage.setItem("niougalOrders",JSON.stringify(orders));render();toast("Commande de démonstration ajoutée.");}else toast("Une commande est déjà disponible.");};
render();