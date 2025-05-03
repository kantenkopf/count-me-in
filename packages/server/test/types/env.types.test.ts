import { isValidEnvMode } from '@/types/env.types';

describe('isValidEnvMode', () => {
  it('should return true for valid environment modes', () => {
    expect(isValidEnvMode('dev')).toBe(true);
    expect(isValidEnvMode('prod')).toBe(true);
  });

  it('should return false for invalid environment modes', () => {
    expect(isValidEnvMode('staging')).toBe(false);
    expect(isValidEnvMode('test')).toBe(false);
    expect(isValidEnvMode('')).toBe(false);
    expect(isValidEnvMode('123')).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isValidEnvMode(null as unknown as string)).toBe(false);
    expect(isValidEnvMode(undefined as unknown as string)).toBe(false);
    expect(isValidEnvMode(123 as unknown as string)).toBe(false);
    expect(isValidEnvMode({} as unknown as string)).toBe(false);
  });
});
