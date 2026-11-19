/** A calendar file for each event, linked from "Add to calendar" on the event page. */
import type { APIRoute, GetStaticPaths } from 'astro';
import { eventsQuery, type EventDetail } from '@energize/shared';
import { sanityClient } from '../../lib/sanity/client';
import { icsFor } from '../../lib/events/calendar';
import { absoluteUrl } from '../../lib/seo/site';

export const getStaticPaths = (async () => {
  const events = await sanityClient.fetch<EventDetail[]>(eventsQuery);
  return events.map((event) => ({ params: { slug: event.slug }, props: { event } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const event = (props as { event: EventDetail }).event;
  return new Response(icsFor(event, absoluteUrl(`/events/${event.slug}`)), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.slug}.ics"`,
    },
  });
};
