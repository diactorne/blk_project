const responses = {
  salutations: ["Bonjour à toi ! 😊", "Salut ! Comment vas-tu ?", "Hello !", "Hey hey ! Ravi de te voir."],
  etat_sante: ["Je vais très bien, merci ! Et toi ?", "Toujours en pleine forme !", "Ça va super ! Et toi, comment tu te sens ?"],
  presentation: ["Je suis un petit chatbot sans prétention 😄", "On m'appelle ChatBot…", "Je suis ton assistant virtuel."],
  adieux: ["À bientôt 👋", "Bye bye !", "Ciao !", "Au revoir !"],
  commandes: ["Voici la liste des commandes : /help, /commande(s), /aide, /contacts"],
  inconnu: ["Je ne suis pas sûr de comprendre…", "Hmm, je n’ai pas encore appris ça.", "Essaie autre chose !"],
  match: ["Fluminense vs Grêmio 03/08/2025  Nul @3.46 - Botafogo vs Cruzeiro  03/08/2025  Les 2 marques @2.07 - Corinthians vs Fortaleza  03/08/2025  V1 @1.86 - Atl. Mineiro vs Bragantino 03/08/2025  V1 @1.91 - Ceara vs Flamingo  03/08/2025  N/2 @1.22."]
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
  botMsg.textContent = botResponse;
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

// Gère l'ouverture du chatbot via le bouton 💬
toggleBtn.addEventListener("click", () => {
  chatContainer.classList.remove("hidden"); // Rend le chatbot visible
  toggleBtn.style.display = 'none'; // Cache le bouton d'ouverture sur TOUS les appareils
});

// Gère la fermeture du chatbot via la croix
closeChatBtn.addEventListener("click", () => {
  chatContainer.classList.add("hidden"); // Cache le chatbot
  toggleBtn.style.display = 'block'; // Réaffiche le bouton d'ouverture sur TOUS les appareils
});