export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  articles: Article[];
  city: string;
  cp: number;
  adresse: string;
};

export type Livraison = {
  city: string;
  cp: number;
  adresse: string;
};

export type Article = {
  id: number;
  title: string;
  description: string;
  size: string;
  price: number;
  etat: string;
  categorie: Categorie;
  user: User;
  likes: Like[];
  likesCount: number;
  createdAt: Date;
  updateAt: Date;
  image: string;
};

export type Categorie = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  user: User;
  article: Article[];
};

export type Panier = {
  id: number;
  user: User;
  articles: Article[];
  totalPrice: number;
  isValidated: boolean;
  createdAt: Date;
  taxe: number;
  totalPriceTaxe: number;
};

export type Facture = {
  id: number;
  user: User;
  articles: Article[];
  totalPrice: number;
  createdAt: Date;
  taxe: number;
  totalPriceTaxe: number;
};
