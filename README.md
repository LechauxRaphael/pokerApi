🃏 API Poker - Texas Hold'em (NestJS)

📋 Liste des routes actives

🔐 Authentification

  POST → http://localhost:8800/api/auth/register {pseudo, mdp, token}
  Crée un compte utilisateur
  
  POST → http://localhost:8800/api/auth/login  {pseudo, mdp, token}
  Permet à un utilisateur de se connecter

  POST → http://localhost:8800/api/auth/logout {token}
  Permet à un utilisateur de se déconnecter

  GET → http://localhost:8800/api/auth/profil 
  Profil utilisateur (besoin d'un token)

👥 Joueurs

  GET → http://localhost:8800/api/users
  Récupère tous les utilisateurs
  
  GET → http://localhost:8800/api/users/:id
  Récupère un utilisateur spécifique

🪑 Tables

  GET → http://localhost:8800/api/tables
  Permet de voir les tables disponibles
  
  GET → http://localhost:8800/api/tables/:id/join
  Permet à un joueur de rejoindre un table

  GET → http://localhost:8800/api/tables/:id/leave
  Permet à un joueur de quitter un table
  
  GET → http://localhost:8800/api/tables/:id
  Permet d'avoir des infos sur une table précise

  nom
  joueurs
  blindes
  statut

🎮 Parties

  POST → http://localhost:8800/api/games
  Lance une nouvelle partie
  
  GET → http://localhost:8800/api/games
  Récupère toutes les parties
  
  GET → http://localhost:8800/api/games/:id
  Récupèrer une partie spécifique

💰 Argent et mises

  GET → http://localhost:8800/api/money
  Récupère l’argent d’un joueur

  POST → http://localhost:8800/api/add_money
  Rajoute de l'argent sur son compte

 🎬 Actions

  POST → http://localhost:8800/api/tables/:id/action {type : fold, check, call, raise, all-in}
  Permet de savoir l'action que souhaite effectuer l'utilisateur
  
  POST → http://localhost:8800/api/tables/:id/blind {type : big, small, null}
  Permet de savoir quel blind a un joueur

🧩 Deck

  GET → http://localhost:8800/api/tables/:id/deck {tableau d'objet de cartes}
  Récupère le deck complet d'une table

🃏 Cartes
  POST → http://localhost:8800/api/tables/:id/deck/distribute {tableau d'objet de cartes}
  Permet de distribuer des cartes

  POST → http://localhost:8800/api/tables/:id/deck/burn {la carte à "passer"}
  Brûle une carte

  GET → http://localhost:8800/api/tables/:id/deck/cards/:id 
  Récupère une carte spécifique
  
 ⚙️ Déroulement : Connexion
                Choix de la table
                Vérification argent nécéssaire
                Rejoindre la table
                Affichage des cartes
                Affichage du rôle (big_blind, small_blind ou neutre)
                Choix actions
                Quitter la table
