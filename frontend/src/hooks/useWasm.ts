import { useState, useEffect, useCallback } from 'react';
import {
  initWasm,
  validateEmailDomainWasm,
  hasValidFormatWasm,
  isWasmReady,
} from '../wasm/wasm-loader';

interface UseWasmReturn {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  validateEmailDomain: (email: string) => boolean;
  hasValidFormat: (email: string) => boolean;
}

export function useWasm(): UseWasmReturn {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        setIsLoading(true);
        const success = await initWasm();
        setIsReady(success);
        if (!success) {
          setError('Failed to load WASM module');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsReady(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isWasmReady()) {
      loadWasm();
    } else {
      setIsReady(true);
      setIsLoading(false);
    }
  }, []);

  const validateEmailDomain = useCallback((email: string): boolean => {
    if (!isReady) {
      return email.endsWith('@uce.edu.ec');
    }
    return validateEmailDomainWasm(email);
  }, [isReady]);

  const hasValidFormat = useCallback((email: string): boolean => {
    if (!isReady) {
      return email.includes('@') && email.length >= 5;
    }
    return hasValidFormatWasm(email);
  }, [isReady]);

  return {
    isReady,
    isLoading,
    error,
    validateEmailDomain,
    hasValidFormat,
  };
}
