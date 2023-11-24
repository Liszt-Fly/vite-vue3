interface IPoint {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}
interface ICard {
  id: string;
  position: IPoint;
  size: ISize;
  content: ICardContent;
  isSelected?: boolean;
  links?: ICardLink[]; // 添加一个链接数组来表示与其他卡片的链接
  // 其他属性...
}

interface ILink {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  // 其他属性...
}
