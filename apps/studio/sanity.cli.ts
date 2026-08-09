import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  studioHost: 'energize-music-studio',
  deployment: {
    appId: 'oojy90ywsjocked0vz4gw4gr',
  },
});
