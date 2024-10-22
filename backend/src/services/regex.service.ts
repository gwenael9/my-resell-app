export class RegexService {
    // regex adresse email
    static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // regex mot de passe (8 caractères, 1 ma, 1 min, 1 chiffre, 1 caractère spé)
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  
    // regex pour vérifier un nom d'utilisateur (lettres et chiffres uniquement)
    static usernameRegex = /^[A-Za-z0-9]+$/;

    // regex pour verifier le titre d'un article
    static titleArticle = /^[A-Za-z0-9\s]+$/;

  
    // Méthode pour valider un email
    static validateEmail(email: string): boolean {
      return this.emailRegex.test(email);
    }
  
    // Méthode pour valider un mot de passe
    static validatePassword(password: string): boolean {
      return this.passwordRegex.test(password);
    }
  
    // Méthode pour valider un nom d'utilisateur
    static validateUsername(username: string): boolean {
      return this.usernameRegex.test(username);
    }

    static formatName(item: string, type: "article" | "username") {

      const message = type === "username" ? "Le nom d'utilisateur" : "LE titre de l'article";

      const regex = type === "username" ? this.usernameRegex : this.titleArticle;

        if (item.length < 3) {
            throw new Error(`${message} doit avoir au moins 3 caractères.`);
          }
      
          if (!regex.test(item)) {
            throw new Error(
              "Le nom d'utilisateur doit contenir seulement des chiffres et des lettres."
            );
          }
      
          // mettre la 1ère lettre en majuscule et le reste en minuscule
          const formattedName =
            item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      
          return formattedName;
    }
  }
  