const responses = {
  salutations: ["Bonjour à toi ! 😊", "Salut ! Comment vas-tu ?", "Hello !", "Hey hey ! Ravi de te voir."],
  etat_sante: ["Je vais très bien, merci ! Et toi ?", "Toujours en pleine forme !", "Ça va super ! Et toi, comment tu te sens ?"],
  presentation: ["Je suis un petit chatbot sans prétention 😄", "On m'appelle ChatBot…", "Je suis ton assistant virtuel."],
  adieux: ["À bientôt 👋", "Bye bye !", "Ciao !", "Au revoir !"],
  commandes: ["Voici la liste des commandes : /help, /commande(s), /aide, /contacts"],
  inconnu: ["Je ne suis pas sûr de comprendre…", "Hmm, je n’ai pas encore appris ça.", "Essaie autre chose !"],
  match: ["#Flamengo-Grêmio 31/08/25: V1 @1.28 #Corinthians-Palmeiras 31/08/25: N/2 @1.32 #Vitoria-Atletico-MG 31/08/25: Total plus de 1.5 @1.49 #Internacional-Fortaleza 01/09/25: 1/N @1.15."]
};

const patterns = {
  salutations: /bonjour|salut|hello|hey/i,
  etat_sante: /ça va|tu vas bien|comment ça va|bien ou bien|ca va/i,
  presentation: /qui es tu|ton nom|comment tu t'appelles/i,
  adieux: /aurevoir|à plus tard|adieu|ciao|bye|au revoir/i,
  commandes: /\/commandes|\/help|\/aide|aides|\/commande/i,
  match: /!match|!matchs/i
};

function detectIntent(message) {
  for (const key in patterns) {
    if (patterns[key].test(message)) return key;
  }
  return "inconnu";
}

function getBotResponse(message) {
  const intent = detectIntent(message);

  if (intent === "match") {
    return responses.match[0].replace(/#/g, '\n#').trim();
  }

  const replies = responses[intent];
  return replies[Math.floor(Math.random() * replies.length)];
}

function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.textContent = message;
  chat.appendChild(userMsg);

  const botResponse = getBotResponse(message);
  const botMsg = document.createElement("div");
  botMsg.className = "bot";
  botMsg.innerHTML = botResponse.replace(/\n/g, "<br>"); // afficher les sauts de ligne
  chat.appendChild(botMsg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

const toggleBtn = document.getElementById("toggleChat");
const chatContainer = document.querySelector(".chat-container");
const closeChatBtn = document.getElementById("closeChat");

toggleBtn.addEventListener("click", () => {
  chatContainer.classList.remove("hidden");
  toggleBtn.style.display = 'none';
});

closeChatBtn.addEventListener("click", () => {
  chatContainer.classList.add("hidden");
  toggleBtn.style.display = 'block';
});

// Fonction pour afficher un message du bot
function afficherMessageBot(message) {
  const chat = document.getElementById("chat");
  const botMsg = document.createElement("div");
  botMsg.className = "bot";
  botMsg.innerHTML = message.replace(/\n/g, "<br>");
  chat.appendChild(botMsg);
  chat.scrollTop = chat.scrollHeight;
}

// Quand on ouvre le chat
toggleBtn.addEventListener("click", () => {
  chatContainer.classList.remove("hidden");
  toggleBtn.style.display = 'none';

// Message de bienvenue automatique
  afficherMessageBot("Bienvenue 👋 Je suis là pour discuter avec toi !");
});

//tri des paris dans l'ordre chronologique automatique
document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("bet-table");
  const tbody = table.querySelector("tbody");

  // Récupère toutes les lignes
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Trie par date (format JJ/MM/AAAA)
  rows.sort((a, b) => {
    const dateA = a.cells[1].innerText.split("/").reverse().join("-");
    const dateB = b.cells[1].innerText.split("/").reverse().join("-");
    return new Date(dateB) - new Date(dateA); // Plus récent en premier
  });

  // Réinsère les lignes triées
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
});
