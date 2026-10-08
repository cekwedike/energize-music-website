import artist from './artist';
import release from './release';
import event from './event';
import nextPage from './nextPage';
import teamMember from './teamMember';
import aboutPage from './aboutPage';
import page from './page';
import releasesPage from './releasesPage';
import post from './blog/post';
import blogCategory from './blog/blogCategory';
import blogBody from './blog/blogBody';
import { blogBlockTypes } from './blog/blocks';

export const schemaTypes = [
  artist,
  release,
  event,
  nextPage,
  teamMember,
  aboutPage,
  page,
  releasesPage,
  post,
  blogCategory,
  blogBody,
  ...blogBlockTypes,
];
