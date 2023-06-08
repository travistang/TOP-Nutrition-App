import React from 'react';
import NumberUtils from '../../../utils/Number';

export default function AutoCompleteResultLoadingPlaceholder() {
    return (
        <>
            {NumberUtils.range(3).map((i) => (
                <div key={i} className="h-14 py-1 px-2 flex items-center gap-2">
                    <div className="rounded-lg h-10 w-16 animate-pulse bg-gray-500" />
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="rounded-lg h-4 w-20 animate-pulse bg-gray-500" />
                        <div className="rounded-lg h-4 w-full animate-pulse bg-gray-500" />
                    </div>
                    <div className="rounded-lg h-4 w-full animate-pulse bg-gray-500" />
                </div>
            ))}
        </>
    );
}