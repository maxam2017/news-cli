import React from 'react';
import { test, expect } from '@jest/globals';
import { render } from 'ink-testing-library';
import NewsEntry from '../src/components/news-entry';
import type { News } from '../src/types';

// https://github.com/chalk/ansi-regex/blob/main/index.js#L3
const AnsiRegexp =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const MockNews: News = {
  id: '146639083',
  title: 'iOS版Google App藏彩蛋 開啟分頁就能玩彈珠台',
  excerpt:
    '如果你是一個時常使用 Google 服務的人就一定知道，Google 最愛在自家產品暗藏許多有趣的小彩蛋；而最近就有人發現，在 iOS 版的 Google 應用程式當中，只要點開應用程式右下角的「分頁」選項（但須先將所有分頁都清除），就會跳出富有 Google 自家風格的彈珠台小遊戲。這款彈珠台小遊戲無論有沒有連上網路均可玩，似乎是為了慶祝國外復活節設計，要注意的是，彈珠台小遊戲也會與復活節...',
  publisher: '科技新報',
  publishedAt: '2021-07-02 19:26:46',
  thumbnail:
    'https://obs.line-scdn.net/0hVE38YohwCWoOQR_T3752PTYXBRs9JxNjLCREDC9AUQoibR05YiBaCSsSBEZzIR49LnBBBChGVQh3IR1pZg',
  url: 'https://today.line.me/tw/v2/article/KaEGJG',
};

test('title and excerpt should be contained', () => {
  const { lastFrame } = render(<NewsEntry item={MockNews} />);
  const result = lastFrame()?.replace(AnsiRegexp, '')?.replace(/\n/g, '');
  expect(result).toMatch(MockNews.title);
});
