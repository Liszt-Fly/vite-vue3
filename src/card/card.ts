import { v4 } from "uuid";
export const createCard = (position: IPoint, size: ISize): ICard => {
  return {
    id: v4(),
    content: "Hello,World",
    position,
    size,
    isSelected: false,
  };
};
