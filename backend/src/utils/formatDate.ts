import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Article } from "../models/article";

// formater les dates d'un article
export function formatArticleDates(article: Article) {
  return {
    ...article,
    createdAt: format(article.createdAt, "dd/MM/yyyy HH:mm", { locale: fr }),
    updateAt: format(article.updateAt, "dd/MM/yyyy HH:mm", { locale: fr }),
  };
}
