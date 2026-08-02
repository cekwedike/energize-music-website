export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

export interface SlugField {
  current: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}
