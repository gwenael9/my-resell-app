import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const avatars = [
  "avatar01",
  "avatar02",
  "avatar03",
  "avatar04",
  "avatar05",
  "avatar06",
  "avatar07",
  "avatar08",
  "avatar09",
  "avatar10",
  "avatar11",
  "avatar12",
];

// formater la date
export const formatDates = (date: Date | undefined) => {
  if (!date) {
    return;
  }
  return format(date, "dd/MM/yyyy HH:mm", { locale: fr });
};

export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
