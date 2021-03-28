export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type FavoritesParamList = {
  FavoritesScreen: undefined;
};

export type Translation = {
  id: string;
  from: string;
  to: string;
  favorite: boolean;
  target: string;
  domain: Domain;
  timestamp: number;
  userId: string;
};

export type Domain = "auto" | "fml" | "inf";
