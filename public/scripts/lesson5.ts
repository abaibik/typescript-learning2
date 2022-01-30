type Point = { x: number; y: number };
function offsetPoint(point: Point, offset: Point): Point {
  return { x: point.x + offset.x, y: point.y + offset.y };
}
type Rectangle = { topLeft: Point; bottomRight: Point };

abstract class MyGraphicsPrimitive2D {
  public abstract get boundingRect(): Rectangle;
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
  }

  public get boundingRect(): Rectangle {
    const topLeft = offsetPoint(this.center, {
      x: -this.radius,
      y: -this.radius,
    });
    const bottomRight = offsetPoint(this.center, {
      x: this.radius,
      y: this.radius,
    });
    return { topLeft, bottomRight };
  }

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public move(offset: Point): void {
    this.center = offsetPoint(this.center, offset);
  }
}

class MyRectangle extends MyAreaPrimitive2D {
  public rectangle: Rectangle;
  constructor(topLeft: Point, bottomRight: Point) {
    super();
    this.rectangle = {
      topLeft,
      bottomRight,
    };
  }

  public area(): number {
    return (
      (this.rectangle.bottomRight.x - this.rectangle.topLeft.x) *
      (this.rectangle.bottomRight.y - this.rectangle.topLeft.y)
    );
  }

  public move(offset: Point): void {
    this.rectangle = {
      topLeft: offsetPoint(this.rectangle.topLeft, offset),
      bottomRight: offsetPoint(this.rectangle.bottomRight, offset),
    };
  }

  public get boundingRect(): Rectangle {
    return this.rectangle;
  }
}
