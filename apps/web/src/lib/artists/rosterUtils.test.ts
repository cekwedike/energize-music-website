import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { excerptCompleteSentences } from './rosterUtils.ts';

describe('excerptCompleteSentences', () => {
  it('returns full text when under max', () => {
    const text = 'Ellie Scotte is a Nigerian gospel singer.';
    assert.equal(excerptCompleteSentences(text, 220), text);
  });

  it('cuts after a complete sentence near the limit', () => {
    const text =
      'Greatman Ademola Takit was born in Surulere, Lagos, but his roots trace back to Kwara State. He grew up in Abuja, in a home built on faith, and that foundation shaped everything he would go on to create. He dropped his first single, "Ain\'t Nobody," back in 2011. But it was his 2016 EP that changed things.';
    const out = excerptCompleteSentences(text, 220);
    assert.match(out, /\.$/);
    assert.doesNotMatch(out, /\u2026$/);
    assert.ok(out.length <= 220);
    assert.ok(out.startsWith('Greatman Ademola Takit'));
  });

  it('falls back to word boundary with ellipsis only when no sentence end exists', () => {
    const text = 'Word '.repeat(80).trim();
    const out = excerptCompleteSentences(text, 80);
    assert.match(out, /\u2026$/);
  });
});
