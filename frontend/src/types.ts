export type User = {
  id: string;
  username: string;
  email: string;
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
  // likes: Like[];
  likesCount: number;
  createdAt: Date;
  updateAt: Date;
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
