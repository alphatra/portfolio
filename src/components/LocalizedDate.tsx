import * as React from 'react';
import { useI18n } from '@/i18n';

interface LocalizedDateProps extends React.HTMLAttributes<HTMLSpanElement> {
  date: Date | string | number;
  options?: Intl.DateTimeFormatOptions;
}

export default function LocalizedDate({ date, options, ...rest }: LocalizedDateProps) {
  const { locale } = useI18n();
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const loc = locale === 'pl' ? 'pl-PL' : locale === 'de' ? 'de-DE' : locale === 'it' ? 'it-IT' : locale === 'zh' ? 'zh-CN' : 'en-US';
  const formatted = d.toLocaleDateString(loc, options || { year: 'numeric', month: 'long', day: 'numeric' });
  return <span {...rest}>{formatted}</span>;
}


