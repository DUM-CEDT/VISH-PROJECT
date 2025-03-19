export interface Vish {
  _id: string;
  user_id: string;
  text: string;
  category_list: string[];
  vish_count: number;
  is_bon: boolean;
  bon_condition: number;
  bon_vish_target: number;
  bon_credit: number;
  distribution: number;
  is_success: boolean;
  report_count: number;
  create_at: string;
  __v: number;
}

export interface VishResponse {
  success: boolean;
  count: number;
  pagination: {
    page: number;
    next: number;
    prev: number;
  };
  vishes: Vish[];
}

export interface VishCategory {
  _id: string;
  category_name: string;
  color: string;
}

export interface VishCategoryResponse {
  success: boolean;
  category: VishCategory;
}

export interface UserJson {
  success: boolean;
  data: {
    _id: string;
    name: string;
    tel: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
  };
}

export interface CreateVishRequest {
  text: string;
  category_list: string[];
  is_bon: boolean;
  bon_condition?: boolean;
  bon_vish_target?: number;
  bon_credit?: number;
  distribution?: number;
}

export interface CreateVishResponse {
  success: boolean;
  vish?: Vish;
  msg?: string;
}