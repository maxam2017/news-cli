interface RawNews {
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

interface News {
  id: string;
  title: string;
  excerpt: string;
  publisher: string;
  publishedAt?: string;
  url: string;
  thumbnail: string;
}

interface Tab {
  id: string;
  portalPageId: string;
  name: string;
  portalPageUrlPath: string;
  fontColor: string;
}

interface RawPage {
  id: string;
  name: string;
  urlPath: string;
  type: string;
  modules: Module[];
}

interface Module {
  id: string;
  type: string;
  name: string;
  source: 'LISTING' | 'BANNER' | 'COMBO' | 'AD' | 'CAT_FORYOU';
  color: string;
  listings: Listing[];
  adArticleListing?: Listing[];
}

interface Listing {
  id: string;
  offset: number;
  length: number;
}

interface Page {
  id: string;
  name: string;
  listings: Listing[];
}

export { RawNews, RawPage, News, Page, Tab, Listing };
