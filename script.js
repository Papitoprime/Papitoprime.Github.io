document.addEventListener('DOMContentLoaded', () => {
  
  // 1. On récupère tous les liens du menu et toutes les cartes produits
  const filtres = document.querySelectorAll('.main-nav a');
  const produits = document.querySelectorAll('.product-card');

  // 2. On écoute le clic sur chaque lien du menu
  filtres.forEach(filtre => {
    filtre.addEventListener('click', function(e) {
      e.preventDefault(); // Empêche la page de remonter tout en haut au clic

      // On retire la classe "active" de tous les liens...
      filtres.forEach(f => f.classList.remove('active-filter'));
      // ... et on l'ajoute uniquement sur le lien qu'on vient de cliquer
      this.classList.add('active-filter');

      // 3. On récupère le nom de la catégorie cliquée (ex: "crampons")
      const categorieCliquee = this.getAttribute('data-filter');

      // 4. On passe en revue tous les produits
      produits.forEach(produit => {
        const categorieProduit = produit.getAttribute('data-category');

        // Si on a cliqué sur "Tout" ou si la catégorie du produit correspond au filtre
        if (categorieCliquee === 'tout' || categorieCliquee === categorieProduit) {
          produit.style.display = 'block'; // On affiche
        } else {
          produit.style.display = 'none'; // On cache
        }
      });
    });
  });
});


// =====================
//   PANIER 
// =====================

const affichageCompteur = document.getElementById('cart-count');
const boutonsAjout = document.querySelectorAll('.product-card button');

// On récupère la liste des produits déjà sauvegardés (ou un tableau vide [])
let panier = JSON.parse(localStorage.getItem('monPanier')) || [];

// Fonction pour mettre à jour l'affichage du compteur
function mettreAJourCompteur() {
    affichageCompteur.textContent = panier.length;
}
mettreAJourCompteur();

boutonsAjout.forEach(bouton => {
    bouton.addEventListener('click', function() {
        // On récupère les infos de la carte produit parente
        const card = this.closest('.product-card');
        const infoProduit = {
            nom: card.querySelector('h2').textContent,
            prix: card.querySelector('.price').textContent,
            image: card.querySelector('img').src
        };

        // On ajoute le produit au tableau
        panier.push(infoProduit);

        // On sauvegarde le tableau entier dans LocalStorage
        localStorage.setItem('monPanier', JSON.stringify(panier));

        mettreAJourCompteur();

        // Petit effet visuel de confirmation
        const texteOriginal = this.textContent;
        this.textContent = "✔ Ajouté !";
        this.style.backgroundColor = "#28a745";
        setTimeout(() => {
            this.textContent = texteOriginal;
            this.style.backgroundColor = "";
        }, 1000);
    });
});





// =====================
//   BARRE DE RECHERCHE
// =====================
const btnSearch = document.getElementById('btn-search');
const barreRecherche = document.getElementById('barre-recherche');
const inputRecherche = document.getElementById('input-recherche');
const btnFermer = document.getElementById('btn-fermer-recherche');

// Ouvrir / fermer la barre au clic sur 🔍
btnSearch.addEventListener('click', () => {
  const estVisible = barreRecherche.style.display === 'flex';
  barreRecherche.style.display = estVisible ? 'none' : 'flex';
  if (!estVisible) inputRecherche.focus();
});

// Fermer avec le bouton ✕
btnFermer.addEventListener('click', () => {
  barreRecherche.style.display = 'none';
  inputRecherche.value = '';
  // Réaffiche tous les produits
  document.querySelectorAll('.product-card').forEach(p => p.style.display = 'block');
});


inputRecherche.addEventListener('input', function () {
  const texte = this.value.toLowerCase().trim();
  document.querySelectorAll('.product-card').forEach(produit => {
    const nom = produit.querySelector('h2').textContent.toLowerCase();
    produit.style.display = nom.includes(texte) ? 'block' : 'none';
  });
});
