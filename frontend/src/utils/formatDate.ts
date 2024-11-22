import { format } from "date-fns";
import { fr } from "date-fns/locale";

// formater la date
export const formatDates = (date: Date | undefined) => {
  if (!date) {
    return;
  }
  return format(date, "dd/MM/yyyy HH:mm", { locale: fr });
};
