export interface Technology {
  name: string;
  icon: string;
}

export interface TechnologyCategory {
  category: string;
  color: string;
  items: Technology[];
}