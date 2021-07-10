export interface RawNews {
  id: string;
  title: string;
  shortDescription: string;
  publisher: string;
  publishTimeUnix: number;
  contentType: string;
  categoryName: string;
  publisherId: string;
  categoryId: string;
  url: {
    hash: string;
  };
  thumbnail: {
    type: string;
    hash: string;
  };
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  publisher: string;
  publishedAt: string;
  url: string;
  thumbnail: string;
}

export interface Tab {
  id: string;
  portalPageId: string;
  name: string;
  portalPageUrlPath: string;
  fontColor: string;
}
