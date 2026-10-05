import type { PortableTextBlock } from '@energize/shared';

function block(style: string, text: string, key: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  } as PortableTextBlock;
}

/** Bump when the wording of a policy changes. Shown as "Effective <date>" on the page. */
export const PRIVACY_EFFECTIVE_DATE = '2026-10-05';
export const TERMS_EFFECTIVE_DATE = '2026-10-05';

export const privacyBlocks: PortableTextBlock[] = [
  block('normal', 'Energize Music Affairs ("Energize Music", "we", "us") respects your privacy. This policy explains what information we collect on energize-music.com and related services, how we use it, and the choices you have.', 'p-intro'),
  block('h2', 'Information we collect', 'p-h2-1'),
  block('normal', 'We collect the details you give us: your name, email address, and message when you use the contact form, and your email address when you join our list to be the first to know about new music and events. We also collect standard technical data, such as browser type, device, pages visited, and approximate location based on IP address.', 'p-b-1'),
  block('h2', 'How we use information', 'p-h2-2'),
  block('normal', 'We use this information to reply to your messages, send the updates you asked for, run and improve the website, understand how people find and use it, and protect it against misuse. We do not sell personal information.', 'p-b-2'),
  block('h2', 'Email updates and the contact form', 'p-h2-3'),
  block('normal', 'Our email list and contact form run on Brevo, an email service that stores contact details and sends email on our behalf. Every update we send includes an unsubscribe link, and you can leave the list at any time.', 'p-b-3'),
  block('h2', 'Cookies and analytics', 'p-h2-4'),
  block('normal', 'We may use cookies and similar tools for essential site functions, to measure visits, and to measure the results of our advertising, for example with Google Analytics, Google Ads, and Meta. You can block or delete cookies in your browser settings. Some features may not work without them.', 'p-b-4'),
  block('h2', 'Sharing', 'p-h2-5'),
  block('normal', 'We share information only with service providers that help us run the site, send email, or process forms, such as our hosting provider and Brevo, and only as needed for those services. We may also disclose information when the law requires it, or to protect the rights and safety of Energize Music, our artistes, or the public.', 'p-b-5'),
  block('h2', 'Data retention', 'p-h2-6'),
  block('normal', 'We keep personal information only as long as we need it for the purposes above, or as long as the law requires. When we no longer need it, we delete or anonymize it.', 'p-b-6'),
  block('h2', 'Your rights', 'p-h2-7'),
  block('normal', 'You can ask to see, correct, or delete the personal information we hold about you, or object to how we use it, under the Nigeria Data Protection Act 2023 and any other law that applies to you. Send your request through the Contact page. To stop receiving email updates, use the unsubscribe link in any email from us.', 'p-b-7'),
  block('h2', 'Children', 'p-h2-8'),
  block('normal', 'This website is for a general audience. Energize Kids content is made for families, but we do not knowingly collect personal information from children under 13 without consent from a parent or guardian.', 'p-b-8'),
  block('h2', 'Changes to this policy', 'p-h2-9'),
  block('normal', 'We may update this policy from time to time. The latest version is always on this page, and the date at the top shows when it last changed.', 'p-b-9'),
  block('h2', 'Contact', 'p-h2-10'),
  block('normal', 'For privacy questions, reach us through the Contact page on this website.', 'p-b-10'),
];

export const termsBlocks: PortableTextBlock[] = [
  block('normal', 'These Terms of Service ("Terms") govern your use of energize-music.com and related Energize Music digital properties. By accessing the site, you agree to these Terms.', 't-intro'),
  block('h2', 'Who we are', 't-h2-1'),
  block('normal', 'Energize Music Affairs is a music label and creative company. References to "Energize Music", "we", or "us" mean Energize Music Affairs and its affiliated brands, including initiatives such as Energize Kids, NEXT, and Energize Fest where applicable.', 't-b-1'),
  block('h2', 'Using the site', 't-h2-2'),
  block('normal', 'You may browse the site for personal, non-commercial use. You agree not to misuse the site, attempt unauthorized access, scrape content at abusive volumes, or interfere with site security or performance.', 't-b-2'),
  block('h2', 'Content and intellectual property', 't-h2-3'),
  block('normal', 'Music, artwork, logos, photography, video, writing, and other materials on this site are owned by Energize Music, our artistes, or licensors. You may not copy, distribute, modify, or create derivative works from this content without prior written permission, except for ordinary browser caching or sharing links to public pages.', 't-b-3'),
  block('h2', 'Artiste and release information', 't-h2-4'),
  block('normal', 'Artiste bios, release details, and streaming links are provided for information and discovery. Availability of music on third-party platforms is controlled by those services and may change. External links (including Spotify, Apple Music, and YouTube) are subject to those platforms\' own terms.', 't-b-4'),
  block('h2', 'Submissions and applications', 't-h2-5'),
  block('normal', 'If you send us demos, applications, or other materials, you confirm you have the right to share them. Unsolicited submissions are not confidential unless we agree otherwise in writing. We are not obligated to review, return, or use any submission.', 't-b-5'),
  block('h2', 'Disclaimer', 't-h2-6'),
  block('normal', 'The site is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability, error-free content, or that the site will meet every expectation. To the fullest extent permitted by law, Energize Music is not liable for indirect, incidental, or consequential damages arising from your use of the site.', 't-b-6'),
  block('h2', 'Changes', 't-h2-7'),
  block('normal', 'We may update these Terms at any time by posting a revised version on this page. Continued use of the site after changes constitutes acceptance of the updated Terms.', 't-b-7'),
  block('h2', 'Contact', 't-h2-8'),
  block('normal', 'Questions about these Terms can be sent through the Contact page on this website.', 't-b-8'),
];
