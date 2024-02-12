import {
  SKElement,
  LayoutMethod,
  Size,
} from "simplekit/imperative-mode";

// 创建一个行布局的工厂函数
export function makeRowLayoutWithJustifyContent(): LayoutMethod {
  return (
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ) => {
    return rowLayoutWithJustifyContent(boundsWidth, boundsHeight, elements);
  };
}

// 实现左右对齐的行布局
export function rowLayoutWithJustifyContent(
  boundsWidth: number,
  boundsHeight: number,
  elements: SKElement[]
): Size {
  if (elements.length < 2) return { width: boundsWidth, height: boundsHeight };

  // 第一个元素对齐到左边
  elements[0].x = 75;
  elements[0].y = (boundsHeight - elements[0].heightLayout) / 2; // 垂直居中

  // 最后一个元素对齐到右边
  const lastIndex = elements.length - 1;
  elements[lastIndex].x = boundsWidth - elements[lastIndex].widthLayout - 75;
  elements[lastIndex].y = (boundsHeight - elements[lastIndex].heightLayout) / 2; // 垂直居中

  // 设置固定高度
  elements.forEach(el => {
    el.heightLayout = 50; // 或其他逻辑
  });

  return { width: boundsWidth, height: boundsHeight };
}
