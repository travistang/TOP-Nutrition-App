import React, { useRef, useState } from 'react';
import useDelayState from '../../hooks/useDelayState';
import TextInput, { TextInputProps } from './TextInput';

type Props<T> = Omit<TextInputProps, 'children'> & {
  onSearch: (searchString: string) => Promise<T[]>;
  renderResult: ((result: T) => React.ReactNode);
  defaultResults?: T[];
  onSelectSearchResult: (result: T) => void;
};

export default function AutoCompleteInput<T>({
  onSearch,
  renderResult,
  onSelectSearchResult,
  defaultResults,
  onChange,
  ...inputProps
}: Props<T>) {
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useDelayState(false);
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const onSelectResult = (result: T) => {
    setSearching(false);
    onSelectSearchResult(result);
  };

  const onChangeWithSearch = (searchString: string) => {
    onChange(searchString);
    setSearching(true);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(async () => {
      const results = await onSearch(searchString);
      setSearchResults(results);
      setSearching(false);
    }, 400);
  };

  const shouldShowDefaultSuggestions = inputProps.value.length === 0 && !!defaultResults?.length;
  const showSuggestions = !searching && focused && (searchResults.length > 0 || shouldShowDefaultSuggestions);
  const resultsToShow = shouldShowDefaultSuggestions ? defaultResults : searchResults;
  return (
    <TextInput onChange={onChangeWithSearch} {...inputProps} onFocusChanged={setFocused}>
      {showSuggestions && <div className="z-40 absolute top-full rounded-lg translate-y-2 left-0 right-0 bg-blue-300 max-h-36 overflow-y-auto overflow-x-hidden">
        {resultsToShow.map(result => (
          <div
            key={JSON.stringify(result)}
            className='hover:bg-blue-400 h-14 py-1 px-2'
            onClick={() => onSelectResult(result)}>
            {renderResult(result)}
          </div>
        ))}
      </div>}
    </TextInput>
  );
}