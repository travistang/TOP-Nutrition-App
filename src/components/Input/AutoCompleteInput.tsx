import React, { useRef, useState } from 'react';
import TextInput, { TextInputProps } from './TextInput';

type Props<T> = Omit<TextInputProps, 'children'> & {
  onSearch: (searchString: string) => Promise<T[]>;
  renderResult: ((result: T) => React.ReactNode);
  onSelectSearchResult: (result: T) => void;
};

export default function AutoCompleteInput<T>({
  onSearch,
  renderResult,
  onSelectSearchResult,
  onChange,
  ...inputProps
}: Props<T>) {
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const onSelectResult = (result: T) => {
    setShowingSuggestions(false);
    onSelectSearchResult(result);
  }

  const onChangeWithSearch = (searchString: string) => {
    onChange(searchString);
    setShowingSuggestions(false);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(async () => {
      const results = await onSearch(searchString);
      setSearchResults(results);
      setShowingSuggestions(results.length > 0);
    }, 400);
  };

  return (
    <TextInput onChange={onChangeWithSearch} {...inputProps}>
      {showingSuggestions && <div className="z-40 absolute top-full rounded-lg translate-y-2 left-0 right-0 bg-blue-300 max-h-36 overflow-y-auto overflow-x-hidden">
        {searchResults.map(result => (
          <div className='hover:bg-blue-400 h-14 py-1 px-2' onClick={() => onSelectResult(result)}>
            {renderResult(result)}
          </div>
        ))}
      </div>}
    </TextInput>
  );
}