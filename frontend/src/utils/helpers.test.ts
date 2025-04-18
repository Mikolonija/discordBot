import { displayValue, formatDate } from '@/utils/helpers';
import { describe, it, expect } from 'vitest';

describe('testing displayValue function', () => {
  it('should return the string representation of a number', () => {
    expect(displayValue(42)).toBe('42');
  });

  it('should return the string representation of a string', () => {
    expect(displayValue('hello')).toBe('hello');
  });

  it('should return "-" for null', () => {
    expect(displayValue(null)).toBe('-');
  });

  it('should return "-" for undefined', () => {
    expect(displayValue(undefined)).toBe('-');
  });

  it('should return "-" for empty string', () => {
    expect(displayValue('')).toBe('-');
  });

  it('should return "false" for boolean false', () => {
    expect(displayValue(false)).toBe('-');
  });
});

describe('testing formatDate function', () => {
  it('should format a valid ISO date string', () => {
    expect(formatDate('2023-03-15T12:00:00Z')).toBe('2023-03-15');
  });

  it('should pad single-digit months and days', () => {
    expect(formatDate('2023-01-05')).toBe('2023-01-05');
  });

  it('should handle different time zones correctly', () => {
    const date = new Date(Date.UTC(2023, 4, 10));
    expect(formatDate(date.toISOString())).toBe('2023-05-10');
  });

  it('should produce "Invalid Date" if input is not a valid date string', () => {
    const result = formatDate('not-a-date');
    expect(result).toBe('NaN-NaN-NaN');
  });
});
