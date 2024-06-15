export const onlyInLeft = <L, R>(
  left: L[],
  right: R[],
  compareFunction: (a: L, b: R) => boolean,
) =>
  left.filter(
    leftValue =>
      !right.some(rightValue => compareFunction(leftValue, rightValue)),
  );
