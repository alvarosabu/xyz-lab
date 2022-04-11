import * as CANNON from 'cannon-es'

const GRAVITY = -9.8

export function usePhysics() {
  const world = new CANNON.World()
  world.gravity.set(0, GRAVITY, 0)
}
