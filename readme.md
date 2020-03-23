# Setup Google Login

https://developers.google.com/identity/sign-in/web/sign-in

1. Aller sur console.developers.google.com et créer un nouveau projet

2. Dans le menu vertical à gauche, dans aller dans le menu 'Écran d'autorisation OAuth'.

    - Cocher la case 'Externe'
    - cliquer sur 'Créer'
    - Rentrer un nom pour votre application ainsi qu'un ou plusieurs noms de domaines (par exemple : lvh.me)

3. Dans le menu vertical à gauche, dans aller dans le menu 'Identidiants'.

    - En haut, cliquer sur 'Créer des identifiants'
    - Choisissez 'ID client OAuth'
    - Cochez 'Application Web', et rentrez un nom
    - Rajouter le domaine dans 'Authorized JS Origins'
    - Vous obtenez un ID client et un code secret client

4. Sélectionner l'entrée qui vient d'être créé dans la liste des ID clients OAuth 2.0

    - En haut, cliquer sur 'Télécharger JSON'
    - Enregistrez le à la racine du projet

---

L'authentification avec Google se déroule de la manière suivante :

L'utilisateur se connecte avec le bouton Login fournit par Google. En échange, nous récupérons les informations de l'utilisateur,
ainsi qu'un 'token_id' qui va agir comme un Bearer Token (JWT).

À chaque requête à l'API que l'utilisateur devra faire, il faudra lui passer en header ce token.
Côté serveur, le token sera récupéré et vérifier à l'aide d'une librairie.

Lors d'une connexion utilisateur, une requête au serveur sera faite 
