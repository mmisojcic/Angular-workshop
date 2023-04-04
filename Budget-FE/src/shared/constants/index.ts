import { InputmaskOptions } from '@ngneat/input-mask';

export const budgetMaskConfig: InputmaskOptions<number> = {
  alias: 'numeric',
  allowMinus: false,
  groupSeparator: '.',
  numericInput: true,
  rightAlign: false,
  radixPoint: ',',
  digits: 2,
  suffix: ' RSD',
  unmaskAsNumber: true,
  autoUnmask: true,
};

export const dateBaseDateFormat = 'YYYY-MM-DD';
