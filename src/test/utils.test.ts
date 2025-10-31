import { describe, it, expect, beforeEach, vi } from 'vitest';
import { debounce } from '../utils/debounce';

/**
 * Utility function tests
 */
describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    vi.advanceTimersByTime(500);
    debouncedFn();
    vi.advanceTimersByTime(500);
    
    expect(fn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

