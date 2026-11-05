export interface SanityImageMetadata {
  dimensions?: { width: number; height: number };
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: SanityImageMetadata;
  };
  alt?: string;
}

export interface SlugField {
  current: string;
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}
