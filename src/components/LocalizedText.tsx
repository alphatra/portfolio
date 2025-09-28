import * as React from 'react';
import { useI18n } from '@/i18n';

type LocalizedTextProps<T extends keyof JSX.IntrinsicElements = 'span'> = {
  k: string;
  as?: T;
} & JSX.IntrinsicElements[T];

export function LocalizedText<T extends keyof JSX.IntrinsicElements = 'span'>(props: LocalizedTextProps<T>) {
  const { t } = useI18n();
  const { k, as, children, ...rest } = props as any;
  const Tag = (as || 'span') as any;
  const translated = t(k);
  return <Tag {...rest}>{translated || children}</Tag>;
}

export default LocalizedText;


