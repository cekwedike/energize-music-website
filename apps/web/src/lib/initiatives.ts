import { initiativesNav, type InitiativeItem } from './nav';
import { sanityClient } from './sanity/client';

export const FEST_SLUG = 'energize-fest';
export const FEST_PATH = `/events/${FEST_SLUG}`;

let festPublished: Promise<boolean> | null = null;

/** Whether the Energize Fest event is published in Sanity. Fetched once per build. */
export function isFestPublished(): Promise<boolean> {
  festPublished ??= sanityClient
    .fetch<boolean>(`defined(*[_type == "event" && slug.current == $slug][0]._id)`, { slug: FEST_SLUG })
    .catch(() => false);
  return festPublished;
}

/** Initiatives to show in menus and on the home page. Energize Fest only appears while its page exists. */
export async function getInitiatives(): Promise<InitiativeItem[]> {
  const fest = await isFestPublished();
  return initiativesNav.filter((item) => item.href !== FEST_PATH || fest);
}
