/** Real installation content. Optional details remain absent until verified. */
export interface GalleryImage {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
  previewWidth: number;
  alt: string;
}

export interface GalleryItem extends GalleryImage {
  title: string;
  category: string;
  additionalPhotos?: GalleryImage[];
  beforeAfter?: { before: GalleryImage; after: GalleryImage };
  location?: string;
  product?: { name?: string; manufacturer?: string };
}
