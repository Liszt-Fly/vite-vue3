export function getTransformValues(element: HTMLElement): {
  translateX: number;
  translateY: number;
} {
  const transformString = element.style.transform;
  const regex = /translate\(([-\d.]+)px, ([-\d.]+)px\)/;
  const matches = transformString.match(regex);

  if (matches && matches.length === 3) {
    const [, translateX, translateY] = matches;
    return {
      translateX: parseFloat(translateX),
      translateY: parseFloat(translateY),
    };
  }

  return { translateX: 0, translateY: 0 };
}

export function getRectEdgeMidpoints(element: HTMLElement): {
  topMid: { x: number; y: number };
  bottomMid: { x: number; y: number };
  leftMid: { x: number; y: number };
  rightMid: { x: number; y: number };
} {
  const { translateX, translateY } = getTransformValues(element);

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const centerX = translateX + width / 2;
  const centerY = translateY + height / 2;

  const topMid = {
    x: centerX,
    y: translateY,
  };

  const bottomMid = {
    x: centerX,
    y: translateY + height,
  };

  const leftMid = {
    x: translateX,
    y: centerY,
  };

  const rightMid = {
    x: translateX + width,
    y: centerY,
  };

  return { topMid, bottomMid, leftMid, rightMid };
}
