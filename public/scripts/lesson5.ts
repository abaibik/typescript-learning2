type Point = { x: number; y: number };
function offsetPoint(point: Point, offset: Point): Point {
  return { x: point.x + offset.x, y: point.y + offset.y };
}
type Rectangle = { topLeft: Point; bottomRight: Point };

abstract class MyGraphicsPrimitive2D {
  public boundingRect: Rectangle;
  public abstract move(offset: Point): void;
}

abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
  public abstract area(): number;
}

class MyCircle extends MyAreaPrimitive2D {
  public center: Point;
  public readonly radius: number;

  constructor(center: Point, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
    const topLeft = offsetPoint(center, {
      x: -radius,
      y: -radius,
    });
    const bottomRight = offsetPoint(center, {
      x: radius,
      y: radius,
    });

    this.boundingRect = { topLeft, bottomRight };
  }

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public move(offset: Point): void {
    this.center = offsetPoint(this.center, offset);
    this.boundingRect = {
      topLeft: offsetPoint(this.boundingRect.topLeft, offset),
      bottomRight: offsetPoint(this.boundingRect.bottomRight, offset),
    };
  }
}
