import type { VolunteerInfo } from '@energize/shared';

export const volunteerInfoDefaults: VolunteerInfo = {
  eyebrow: 'Serve with purpose',
  heading: 'Volunteer With Us',
  intro:
    'Help grow faith-forward music across Africa and the diaspora. Join creatives, organizers, and believers who make the Energy Different possible.',
  roleOptionsLabel: 'Ways to help',
  roleOptions: [
    'Event support',
    'Social media',
    'Community outreach',
    'Creative production',
    'Artist liaison',
  ],
  platformsLabel: 'Platforms',
  platforms: ['Instagram', 'WhatsApp', 'YouTube', 'TikTok'],
  ctaLabel: 'Join the volunteer list',
  fallbackCtaLabel: 'Contact us to volunteer',
  fallbackCtaUrl: '/contact',
  secondaryLinkLabel: 'Questions? Reach The Team',
  secondaryLinkUrl: '/contact',
};

function cleanList(values: string[] | undefined): string[] {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
}

export function mergeVolunteerInfo(
  volunteer: VolunteerInfo | null | undefined,
): VolunteerInfo {
  const roleOptions = cleanList(volunteer?.roleOptions);
  const platforms = cleanList(volunteer?.platforms);

  return {
    ...volunteerInfoDefaults,
    ...volunteer,
    eyebrow: volunteer?.eyebrow?.trim() || volunteerInfoDefaults.eyebrow,
    heading: volunteer?.heading?.trim() || volunteerInfoDefaults.heading,
    intro: volunteer?.intro?.trim() || volunteerInfoDefaults.intro,
    roleOptionsLabel:
      volunteer?.roleOptionsLabel?.trim() || volunteerInfoDefaults.roleOptionsLabel,
    roleOptions: roleOptions.length > 0 ? roleOptions : volunteerInfoDefaults.roleOptions,
    platformsLabel:
      volunteer?.platformsLabel?.trim() || volunteerInfoDefaults.platformsLabel,
    platforms: platforms.length > 0 ? platforms : volunteerInfoDefaults.platforms,
    signupUrl: volunteer?.signupUrl?.trim() || undefined,
    ctaLabel: volunteer?.ctaLabel?.trim() || volunteerInfoDefaults.ctaLabel,
    fallbackCtaLabel:
      volunteer?.fallbackCtaLabel?.trim() || volunteerInfoDefaults.fallbackCtaLabel,
    fallbackCtaUrl:
      volunteer?.fallbackCtaUrl?.trim() || volunteerInfoDefaults.fallbackCtaUrl,
    secondaryLinkLabel:
      volunteer?.secondaryLinkLabel?.trim() || volunteerInfoDefaults.secondaryLinkLabel,
    secondaryLinkUrl:
      volunteer?.secondaryLinkUrl?.trim() || volunteerInfoDefaults.secondaryLinkUrl,
  };
}
