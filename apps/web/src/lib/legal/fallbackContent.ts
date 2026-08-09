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

export const privacyFallbackBlocks: PortableTextBlock[] = [
  block('normal', 'Energize Music Affairs ("Energize Music", "we", "us") respects your privacy. This policy explains what information we collect on energize-music.com and related services, how we use it, and the choices you have.', 'p-intro'),
  block('h2', 'Information we collect', 'p-h2-1'),
  block('normal', 'We may collect information you provide directly, such as your name, email address, and message contents when you contact us, apply for roles, or join our newsletter. We may also collect standard technical data such as browser type, device information, pages visited, and approximate location derived from IP address.', 'p-b-1'),
  block('h2', 'How we use information', 'p-h2-2'),
  block('normal', 'We use information to operate and improve the website, respond to inquiries, send communications you request, understand audience engagement, and protect against misuse. We do not sell personal information.', 'p-b-2'),
  block('h2', 'Cookies and analytics', 'p-h2-3'),
  block('normal', 'We may use cookies or similar technologies for essential site functions and anonymous analytics. You can control cookies through your browser settings. Disabling cookies may affect some features.', 'p-b-3'),
  block('h2', 'Sharing', 'p-h2-4'),
  block('normal', 'We may share information with trusted service providers who help us host the site, deliver email, or process forms, only as needed to perform those services. We may also disclose information if required by law or to protect the rights and safety of Energize Music, our artists, or the public.', 'p-b-4'),
  block('h2', 'Data retention', 'p-h2-5'),
  block('normal', 'We keep personal information only as long as needed for the purposes described above, or as required by law. When information is no longer needed, we delete or anonymize it.', 'p-b-5'),
  block('h2', 'Your choices', 'p-h2-6'),
  block('normal', 'You may request access, correction, or deletion of personal information we hold about you by contacting us. If you subscribe to email updates, you can unsubscribe at any time using the link in those messages.', 'p-b-6'),
  block('h2', 'Children', 'p-h2-7'),
  block('normal', 'Our main website is intended for a general audience. Energize Kids content is designed for families; we do not knowingly collect personal information from children under 13 without appropriate parental consent where required.', 'p-b-7'),
  block('h2', 'Updates', 'p-h2-8'),
  block('normal', 'We may update this policy from time to time. The latest version will always be posted on this page. Continued use of the site after changes means you accept the updated policy.', 'p-b-8'),
  block('h2', 'Contact', 'p-h2-9'),
  block('normal', 'For privacy questions, reach us through the Contact page on this website.', 'p-b-9'),
];

export const termsFallbackBlocks: PortableTextBlock[] = [
  block('normal', 'These Terms of Service ("Terms") govern your use of energize-music.com and related Energize Music digital properties. By accessing the site, you agree to these Terms.', 't-intro'),
  block('h2', 'Who we are', 't-h2-1'),
  block('normal', 'Energize Music Affairs is a music label and creative company. References to "Energize Music", "we", or "us" mean Energize Music Affairs and its affiliated brands, including initiatives such as Energize Kids, NEXT, and Energize Fest where applicable.', 't-b-1'),
  block('h2', 'Using the site', 't-h2-2'),
  block('normal', 'You may browse the site for personal, non-commercial use. You agree not to misuse the site, attempt unauthorized access, scrape content at abusive volumes, or interfere with site security or performance.', 't-b-2'),
  block('h2', 'Content and intellectual property', 't-h2-3'),
  block('normal', 'Music, artwork, logos, photography, video, writing, and other materials on this site are owned by Energize Music, our artists, or licensors. You may not copy, distribute, modify, or create derivative works from this content without prior written permission, except for ordinary browser caching or sharing links to public pages.', 't-b-3'),
  block('h2', 'Artist and release information', 't-h2-4'),
  block('normal', 'Artist bios, release details, and streaming links are provided for information and discovery. Availability of music on third-party platforms is controlled by those services and may change. External links (including Spotify, Apple Music, and YouTube) are subject to those platforms\' own terms.', 't-b-4'),
  block('h2', 'Submissions and applications', 't-h2-5'),
  block('normal', 'If you submit demos, applications, volunteer interest, or other materials, you confirm you have the right to share them. Unsolicited submissions are not confidential unless we agree otherwise in writing. We are not obligated to review, return, or use any submission.', 't-b-5'),
  block('h2', 'Disclaimer', 't-h2-6'),
  block('normal', 'The site is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability, error-free content, or that the site will meet every expectation. To the fullest extent permitted by law, Energize Music is not liable for indirect, incidental, or consequential damages arising from your use of the site.', 't-b-6'),
  block('h2', 'Changes', 't-h2-7'),
  block('normal', 'We may update these Terms at any time by posting a revised version on this page. Continued use of the site after changes constitutes acceptance of the updated Terms.', 't-b-7'),
  block('h2', 'Contact', 't-h2-8'),
  block('normal', 'Questions about these Terms can be sent through the Contact page on this website.', 't-b-8'),
];
