import classNames from 'classnames';
import React from 'react';
import Section from '../Section';

type Props = {
  title: string;
  text: string;
  className?: string;
  textClassName?: string;
}
export default function TextSection({ text, title, className, textClassName }: Props) {
  return (
    <Section className={className} label={title}>
      <span className={classNames(textClassName ?? "text-sm font-bold whitespace-nowrap text-ellipsis overflow-hidden")}>
        {text}
      </span>
    </Section>
  )
}