import { buildHeaders } from '../src/index';

describe('common package API functions', () => {
  describe('buildHeaders', () => {
    it('should return undefined when appId is not provided', () => {
      const result = buildHeaders(undefined);
      expect(result).toBeUndefined();
    });

    it('should return undefined when appId is empty string', () => {
      const result = buildHeaders('');
      expect(result).toBeUndefined();
    });

    it('should return headers with X-App-Id when appId is provided', () => {
      const result = buildHeaders('nextjs');
      expect(result).toEqual({ 'X-App-Id': 'nextjs' });
    });

    it('should return headers with X-App-Id for astro', () => {
      const result = buildHeaders('astro');
      expect(result).toEqual({ 'X-App-Id': 'astro' });
    });

    it('should return headers with X-App-Id for vanilla', () => {
      const result = buildHeaders('vanilla');
      expect(result).toEqual({ 'X-App-Id': 'vanilla' });
    });
  });
});
