/**
 * Seed About page + team members from energize-music.com/team content.
 *
 * Usage (from repo root):
 *   SANITY_WRITE_TOKEN=<token> pnpm --filter @energize/studio seed:team
 *
 * Windows PowerShell (from repo root):
 *   $env:SANITY_WRITE_TOKEN="<token>"
 *   $env:SANITY_STUDIO_PROJECT_ID="mw1jn7pa"
 *   $env:SANITY_STUDIO_DATASET="production"
 *   pnpm --filter @energize/studio seed:team
 *
 * Or put SANITY_WRITE_TOKEN in apps/studio/.env and run:
 *   pnpm --filter @energize/studio seed:team
 *
 * Requires a Sanity API token with write access to the production dataset.
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID');
  process.exit(1);
}

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN - create one at https://sanity.io/manage');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function block(_key, style, text) {
  return {
    _type: 'block',
    _key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${_key}-span`, text, marks: [] }],
  };
}

const teamMembers = [
  {
    name: 'Tochukwu Macfoy',
    role: 'Founder',
    bio: 'Tochukwu Macfoy is a media communications professional with a solid track record and initiatives merging entertainment, sports, fashion, music, art, and technology. A pop culture and millennial strategist with a passion for technology and the ability to build things.',
    order: 0,
  },
  {
    name: 'Charity Maduka MacFoy',
    role: 'Head of Projects and People',
    bio: 'Charity Macfoy is a skilled professional who specializes in building structures and improving processes. With expertise in developing efficient workflows and optimizing operations, she ensures seamless integration and enhanced productivity. Committed to excellence, Charity leverages best practices and innovative solutions to drive continuous improvement, deliver significant results, and support organizational growth.',
    order: 1,
  },
  {
    name: 'Teniola Akanni',
    role: 'Legal Partner',
    bio: 'An entertainment lawyer and consultant with over 7 years of experience in the entertainment industry. Worked with many artists including viral TikTok sensation, Ckay.',
    order: 2,
  },
  {
    name: 'Excel Joab',
    role: 'Head of Music',
    bio: 'Excel Joab is a creative consultant and pop-culture aficionado with a decade-long experience in the media and music business. His expertise comes from his passion for the creative industry and working with entertainment giants such as Boomplay, Pernod Ricard, Ziiki Media, Tecno, and Pulse Nigeria.',
    order: 3,
  },
  {
    name: 'Emmanuel Abadi',
    role: 'COO',
    bio: "A seasoned Fintech specialist with extensive industry experience in business transformation. He is a part of the team building one of Africa's biggest and most notable Fintechs, Moniepoint.",
    order: 4,
  },
];

const aboutPageDoc = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'About Energize Music',
  teamSectionTitle: 'Meet Our Team',
  intro: [
    block('intro1', 'normal', 'Energize Music is an Afro-gospel & soul-fusion record label providing high-quality, family-friendly, uplifting music - built on the belief that music has the power to connect people and speak to audiences everywhere.'),
    block('intro2', 'normal', 'We champion artists who blend African rhythm with gospel truth, creating a sound that resonates across generations and borders.'),
    block('intro3', 'normal', 'Whether through releases, live experiences, or initiatives like NEXT and Energize Kids, our work is rooted in one conviction: music can inspire positive change.'),
    block('mission-h2', 'h2', 'Mission'),
    block('mission-p', 'normal', 'We are here to inspire positive emotions through music that uplifts, connects, and speaks to audiences everywhere.'),
    block('vision-h2', 'h2', 'Vision'),
    block('vision-p', 'normal', 'To influence and inspire 1,000,000,000 minds with the good news - carried from Lagos to every corner of the earth.'),
    block('values-h2', 'h2', 'Values'),
    block('values-p', 'normal', 'Excellence in music and lyrics, positivity and uplifting content, family-friendly material across cultures, and relevance to global audiences.'),
  ],
};

async function seed() {
  console.log(`Seeding about page + ${teamMembers.length} team members to ${projectId}/${dataset}…`);

  await client.createOrReplace(aboutPageDoc);

  for (const member of teamMembers) {
    const existing = await client.fetch(
      `*[_type == "teamMember" && name == $name][0]{ _id }`,
      { name: member.name },
    );

    const doc = {
      _type: 'teamMember',
      ...member,
    };

    if (existing && existing._id) {
      await client.patch(existing._id).set(doc).commit();
      console.log(`  Updated: ${member.name}`);
    } else {
      await client.create(doc);
      console.log(`  Created: ${member.name}`);
    }
  }

  console.log('Done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
