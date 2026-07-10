import { useState } from 'react';
import { useWasm } from '../../hooks/useWasm';

export default function WasmDemo() {
  const { isReady, isLoading, error, validateEmailDomain, hasValidFormat } = useWasm();
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{ valid: boolean; formatValid: boolean } | null>(null);

  const handleValidate = () => {
    const valid = validateEmailDomain(email);
    const formatValid = hasValidFormat(email);
    setResult({ valid, formatValid });
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700">Loading WebAssembly module...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">WebAssembly Email Validator</h3>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded ${isReady ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {isReady ? 'WASM Ready' : 'Fallback to JS'}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email (e.g., student@uce.edu.ec)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleValidate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Validate
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          <div className={`p-3 rounded ${result.valid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <p className={`font-medium ${result.valid ? 'text-green-800' : 'text-red-800'}`}>
              {result.valid ? '✓ Valid UCE email' : '✗ Not a UCE institutional email'}
            </p>
          </div>

          <div className={`p-3 rounded ${result.formatValid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <p className={`font-medium ${result.formatValid ? 'text-green-800' : 'text-red-800'}`}>
              {result.formatValid ? '✓ Valid email format' : '✗ Invalid email format'}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            {isReady ? 'Validated using WebAssembly (WASM)' : 'Validated using JavaScript (WASM not available)'}
          </p>
        </div>
      )}
    </div>
  );
}
