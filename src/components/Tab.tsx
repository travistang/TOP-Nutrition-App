import classNames from 'classnames';
import React from 'react';

export type TabConfig = {
    label: string;
    onClick: () => void;
};
type Props = {
    className?: string;
    options: TabConfig[];
    selected: (tabConfig: TabConfig) => boolean;
};

export default function Tab({ className, options, selected }: Props) {
    return (
        <div className={classNames("h-10 flex flex-row flex-nowrap", className)}>
            {options.map(({ label, onClick }) => (
                <span key={label} onClick={onClick} className={
                    classNames(
                        "text-xs h-10 flex-1 first:rounded-l-lg last:rounded-r-lg border border-gray-900 flex items-center justify-center",
                        selected({ label, onClick }) ? "bg-gray-900 text-gray-200" : "text-gray-900 bg-gray-200"
                    )
                }>{label}</span>
            ))}
        </div>
    );
}