/**
 * Conversion tracking for search and social ads. Every tag is optional and only fires
 * when its PUBLIC_* id is set (see components/seo/Analytics.astro).
 */
type EventName = 'sign_up' | 'generate_lead';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: unknown[];
  }
}

const ADS_ID = import.meta.env.PUBLIC_GOOGLE_ADS_ID;
const ADS_LABELS: Record<EventName, string | undefined> = {
  sign_up: import.meta.env.PUBLIC_GOOGLE_ADS_SIGNUP_LABEL,
  generate_lead: import.meta.env.PUBLIC_GOOGLE_ADS_LEAD_LABEL,
};
const META_EVENTS: Record<EventName, string> = {
  sign_up: 'CompleteRegistration',
  generate_lead: 'Lead',
};

export function trackEvent(name: EventName, params: Record<string, string> = {}): void {
  try {
    window.gtag?.('event', name, params);
    const label = ADS_LABELS[name];
    if (ADS_ID && label) window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
    window.fbq?.('track', META_EVENTS[name]);
  } catch {
    // Tracking must never break a form.
  }
}
