// import MainScene from '../scenes/serverScene';
import { Engine, World, Bodies, Body, Vector } from 'matter-js';
import { getSeed } from '../../utils/seed';
import Entity from './entity';
import { Bounds, Composite, Events as MatterEvents } from 'matter-js';
import Unit from './unit';
import ServerScene from '../../scenes/serverScene';

class Building extends Entity {
  public readonly body: Body;
  public readonly ownerId: string;

  constructor(scene: ServerScene, position: Vector, radius: number, ownerId: string) {
    super();
    const { x, y } = position;
    const seed = getSeed();
    this.ownerId = ownerId;
    this.id = seed.generate();
    this.body = Bodies.circle(x, y, radius, { isStatic: true, isSensor: false });
    // @ts-ignore
    this.body.ownerEntity = this;
    // @ts-ignore
    this.body.onCollision = (collidedObject) => {
      //console.log(`COLLISION: UNIT ${this.ownerId} AND BUILDING ${collidedObject.ownerEntity.ownerId}`);
    };
    // @ts-ignore
    this.body.onCollisionEnd = (collidedObject) => {};

    this.onDestroyedEvent = () => {
      scene.removeBuilding(this.id);
    };
  }

  public onDestroyedEvent;

  //public onCollision(entity: Unit) {}
}
export default Building;
