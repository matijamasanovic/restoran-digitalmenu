export interface MenuGroup {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
  items?: MenuItem[];
}

export interface MenuItem {
  id: string;
  group_id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}
