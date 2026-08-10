import type { NextPageSettings } from '@energize/shared';

export const nextPageDefaults: NextPageSettings = {
  submissionsOpen: false,
  submitUrl: 'https://tally.so/r/ob7Px1',
  submitLabel: 'Submit Your Music',
  closedLabel: 'Submissions Closed',
  closedMessage: 'Registration for this season has ended. Follow Energize Music for the next drop.',
};

export function mergeNextPageSettings(
  settings: NextPageSettings | null | undefined,
): NextPageSettings {
  return {
    ...nextPageDefaults,
    ...settings,
    submissionsOpen: settings?.submissionsOpen ?? nextPageDefaults.submissionsOpen,
    submitLabel: settings?.submitLabel?.trim() || nextPageDefaults.submitLabel,
    closedLabel: settings?.closedLabel?.trim() || nextPageDefaults.closedLabel,
    closedMessage: settings?.closedMessage?.trim() || nextPageDefaults.closedMessage,
    submitUrl: settings?.submitUrl?.trim() || nextPageDefaults.submitUrl,
  };
}
