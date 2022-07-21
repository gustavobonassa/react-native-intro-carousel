import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type CarouselData = {
  key: string;
  title: string;
  backgroundColor?: string;
  image?: any;
  description?: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  imageStyle?: ImageStyle;
  data?: any;
};

export type ButtonType = {
  label?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
};

export type PaginationType = {
  dotSize?: number;
  bottomOffset?: number;
  animated?: boolean;
  disabled?: boolean;
  dotIncreaseSize?: number;
  color?: string;
  activeColor?: string;
};

export type ButtonsConfigType = {
  next?: ButtonType;
  prev?: ButtonType;
  skip?: ButtonType;
  done?: ButtonType;
  disabled?: boolean;
};

export type CarouselProps = {
  data: CarouselData[];
  paginationConfig?: PaginationType;
  renderItem?: (
    {
      item,
      index,
    }: {
      item: CarouselData;
      index: number;
    },
    goToSlide: (slide: number) => void
  ) => Element;
  buttonsConfig?: ButtonsConfigType;
  onFinish?: () => void;
  onPressSkip?: () => void;
};
