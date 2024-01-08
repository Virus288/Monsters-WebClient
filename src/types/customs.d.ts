import type { IDefaultChildren } from './theme';

export interface IContainerProps extends IDefaultChildren {
  $direction?: string;
  $justify?: string;
  $align?: string;
  $wrap?: string;
  $noScroll?: boolean;
  $height?: number;
}

export interface IHeaderProps extends IDefaultChildren {
  $center?: boolean;
}

export interface ISpanProps extends IDefaultChildren {
  $width?: number;
  $mobileWidth?: number;
}

export interface ITextProps extends IDefaultChildren {
  $width?: number | string;
}

export interface IInputProps extends IDefaultChildren {
  $full?: boolean;
  $centerText?: boolean;
}

export interface IChatMessageProps extends IDefaultChildren {
  $sender?: boolean;
}
