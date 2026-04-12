export type Invite = {
    id: string;
    owner_id?: string; // اختياري حتى لا يكسر الأنواع لو ما بدك تستخدمه بالواجهة
    slug: string;
    template_id: string;
    title: string;
    host_names: string;
    event_at: string;
    location_name: string | null;
    maps_url: string | null;
    notes: string | null;
    cover_image_url: string | null;
    gallery_image_urls: string[] | null;
  };
  
  export type Theme = {
    cardBg: string;
    border: string;
    primary: string;
    text: string;
    mutedText: string;
    inputBg: string;
  };
  
  export type ThemeKey = "elegant" | "floral" | "minimal";
