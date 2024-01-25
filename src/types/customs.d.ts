import type { IDefaultComponentProps } from './theme';

export interface IContainerProps extends IDefaultComponentProps {
  $direction?: string;
  $justify?: string;
  $align?: string;
  $wrap?: string;
  $noScroll?: boolean;
  $height?: number;
  $spacer?: boolean;
}

export interface ISpanProps extends IDefaultComponentProps {
  $width?: number;
  $mobileWidth?: number;
}

export interface ITextProps extends IDefaultComponentProps {
  $width?: number | string;
}

export interface IInputProps extends IDefaultComponentProps {
  $full?: boolean;
  $centerText?: boolean;
}
