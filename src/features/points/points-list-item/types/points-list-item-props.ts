import { Point, PointPhoto } from '../../types';

export interface PointsListItemProps {
  pointNumber: number;
  point: Point;
  setFullScreenImage: React.Dispatch<React.SetStateAction<PointPhoto | null>>;
  deletePoint: (pointId: number) => void;
}
