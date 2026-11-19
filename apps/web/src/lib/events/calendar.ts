/**
 * Calendar and map links for an event: a downloadable .ics file (pages/events/[slug].ics.ts),
 * a Google Calendar link, and a Google Maps search for the venue.
 */
import type { EventDetail } from '@energize/shared';
import { formatEventLocation } from './format';

/** Events without an end time are assumed to run four hours. */
const DEFAULT_LENGTH_MS = 4 * 60 * 60 * 1000;

const CRLF = String.fromCharCode(13, 10);

export function eventEnd(event: Pick<EventDetail, 'startDate' | 'endDate'>): Date {
  if (event.endDate) return new Date(event.endDate);
  return new Date(new Date(event.startDate).getTime() + DEFAULT_LENGTH_MS);
}

/** 20261211T150000Z */
function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** The venue, or undefined while it is still to be announced. */
export function knownVenue(location?: string): string | undefined {
  const venue = formatEventLocation(location);
  return venue === 'Venue to be announced' ? undefined : venue;
}

export function googleCalendarUrl(event: EventDetail, pageUrl: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${utcStamp(new Date(event.startDate))}/${utcStamp(eventEnd(event))}`,
    details: [event.summary, pageUrl].filter(Boolean).join('\n\n'),
  });
  const venue = knownVenue(event.location);
  if (venue) params.set('location', venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function directionsUrl(location?: string): string | undefined {
  const venue = knownVenue(location);
  return venue ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}` : undefined;
}

/** Escape text for an iCalendar property value. */
const icsText = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/[,;]/g, (m) => `\\${m}`);

/** iCalendar lines must stay within 75 octets; longer ones continue on lines that start with a space. */
function fold(line: string): string {
  const bytes = new TextEncoder();
  if (bytes.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  for (const char of line) {
    const limit = parts.length === 0 ? 75 : 74;
    if (bytes.encode(current + char).length > limit) {
      parts.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.join(`${CRLF} `);
}

export function icsFor(event: EventDetail, pageUrl: string): string {
  const venue = knownVenue(event.location);
  const description = event.summary ? `${event.summary}\n\n${pageUrl}` : pageUrl;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Energize Music//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event._id}@energize-music.com`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(new Date(event.startDate))}`,
    `DTEND:${utcStamp(eventEnd(event))}`,
    `SUMMARY:${icsText(event.title)}`,
    `DESCRIPTION:${icsText(description)}`,
    ...(venue ? [`LOCATION:${icsText(venue)}`] : []),
    `URL:${pageUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.map(fold).join(CRLF)}${CRLF}`;
}
