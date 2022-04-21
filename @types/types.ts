export interface AUTH {
  email: string;
  password: string;
}

export interface GET_TAG {
  id: number;
  name: string;
}

export interface TAG {
  name: string;
}
export interface POST {
  id: number;
  title: string;
  content: string;
  image: File | null;
  user: number;
  username: string;
  tags: TAG[];
  is_active: boolean;
  created_at: string;
}
