import { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchInput({ placeholder = 'Поиск...', onSearch }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit:React.SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
		  🔎
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-10 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="Очистить поиск"
          >
            ✕
          </button>
        )}
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        Найти
      </button>
    </form>
  );
}
