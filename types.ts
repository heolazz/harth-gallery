export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  year: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  client?: string;
  role?: string;
  deliverables?: string[];
  tools?: string[];
  link?: string;
}

export interface ArtPiece {
  id: string;
  title: string;
  imageUrl: string;
  medium: string;
  quote?: string;
  timeSpent?: string;
  dimensions?: string;
}

export type PortfolioItem = Project | ArtPiece;

export interface GeminiResponse {
  text: string;
}