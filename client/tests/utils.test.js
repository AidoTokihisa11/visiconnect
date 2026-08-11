import { describe, it, expect } from 'vitest';
import { cn } from '../src/lib/utils';

describe('cn — tailwind class merger', () => {
  it('joins several class name arguments', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('filters out falsy values (null / undefined / false / "")', () => {
    expect(cn('a', null, undefined, false, '', 'b')).toBe('a b');
  });

  it('handles object syntax where the value gates the key', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active');
  });

  it('deduplicates conflicting tailwind classes and keeps the last one', () => {
    // twMerge should keep the trailing padding utility.
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('preserves non-conflicting utilities in the same family', () => {
    expect(cn('px-2', 'py-4', 'text-sm')).toBe('px-2 py-4 text-sm');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });
});
