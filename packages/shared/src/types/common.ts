export interface SanityImageMetadata {
  dimensions?: { width: number; height: number };
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: SanityImageMetadata;
  };
  /** Editor's crop from the Studio, as fractions trimmed from each edge. */
  crop?: { top: number; bottom: number; left: number; right: number };
  /** Editor's focal point from the Studio. */
  hotspot?: { x: number; y: number; height: number; width: number };
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
