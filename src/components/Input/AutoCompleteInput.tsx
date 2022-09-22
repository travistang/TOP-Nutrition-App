import React, { useRef, useState } from 'react';
import useDelayState from '../../hooks/useDelayState';
import AutoCompleteResultPanel from './AutoCompleteResultPanel';
import TextInput, { TextInputProps } from './TextInput';

type Props<T> = Omit<TextInputProps, 'children'> & {
  onSearch: (searchString: string) => Promise<T[]>;
  renderResult: ((result: T) => React.ReactNode);
  defaultResults?: T[];
  inline?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onSelectSearchResult: (result: T) => void;
};

export default function AutoCompleteInput<T>({
  onSearch,
  renderResult,
  onSelectSearchResult,
  defaultResults,
  inline,
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
    <>
      <TextInput onChange={onChangeWithSearch} {...inputProps} onFocusChanged={setFocused}>
        {!inline && showSuggestions && (
          <AutoCompleteResultPanel
            results={resultsToShow}
            renderResult={renderResult}
            onSelectResult={onSelectResult}
          />
        )}
      </TextInput>
      {inline && showSuggestions && (
        <AutoCompleteResultPanel
          inline
          results={resultsToShow}
          renderResult={renderResult}
          onSelectResult={onSelectResult}
        />
      )}
    </>
  );
}