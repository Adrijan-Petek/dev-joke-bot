export interface Joke {
  text: string;
  category: string;
  tags: string[];
}

export interface JokesData {
  jokes: Joke[];
}

export interface CommandOptions {
  category?: string;
  search?: string;
  count?: number;
  color?: 'pastel' | 'rainbow' | 'mind' | 'retro';
  help?: boolean;
  list?: boolean;
  stats?: boolean;
}
