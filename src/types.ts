type RawNews = {
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
};

type News = {
  id: string;
  title: string;
  excerpt: string;
  publisher: string;
  publishedAt?: string;
  url: string;
  thumbnail: string;
};

type Tab = {
  id: string;
  portalPageId: string;
  name: string;
  portalPageUrlPath: string;
  fontColor: string;
};

type RawPage = {
  id: string;
  name: string;
  urlPath: string;
  type: string;
  modules: Module[];
};

type Module = {
  id: string;
  type: string;
  name: string;
  source: 'LISTING' | 'BANNER' | 'COMBO' | 'AD' | 'CAT_FORYOU';
  color: string;
  listings: Listing[];
  adArticleListing?: Listing[];
};

type Listing = {
  id: string;
  offset: number;
  length: number;
};

type Page = {
  id: string;
  name: string;
  listings: Listing[];
};

export type { RawNews, RawPage, News, Page, Tab, Listing };
