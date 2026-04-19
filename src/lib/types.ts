export type DmmItem = {
  content_id: string;
  product_id: string;
  title: string;
  URL: string;
  affiliateURL: string;
  date: string;
  imageURL?: {
    list?: string;
    small?: string;
    large?: string;
  };
  sampleImageURL?: {
    sample_s?: { image: string[] };
    sample_l?: { image: string[] };
  };
  sampleMovieURL?: {
    size_476_306?: string;
    size_560_360?: string;
    size_644_414?: string;
    size_720_480?: string;
    pc_flag?: number;
    sp_flag?: number;
  };
  review?: { count: number; average: string };
  iteminfo?: {
    genre?: { id: number; name: string }[];
    maker?: { id: number; name: string }[];
    label?: { id: number; name: string }[];
    actress?: { id: number; name: string; ruby: string }[];
    director?: { id: number; name: string; ruby: string }[];
    series?: { id: number; name: string }[];
  };
  prices?: {
    price?: string;
    list_price?: string;
    deliveries?: { delivery: { type: string; price: string }[] };
  };
  volume?: string;
  comment?: string;
};

export type DmmItemListResponse = {
  request: { parameters: Record<string, string> };
  result: {
    status: number;
    result_count: number;
    total_count: number;
    first_position: number;
    items: DmmItem[];
  };
};

export type TagCategory = "girl_type" | "situation" | "shooting_style" | "place_mood";

export type Tag = {
  slug: string;
  label: string;
  category: TagCategory;
  subcategory?: string;
  aliases?: string[];
};

export type EnrichedWork = {
  item: DmmItem;
  customTags: Tag["slug"][];
  summary?: string;
};
