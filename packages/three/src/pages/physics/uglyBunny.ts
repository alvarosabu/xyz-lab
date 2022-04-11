import { AnimationMixer } from 'three'
import * as CANNON from 'cannon-es'

import CannonUtils from './cannonUtils'

export default function UglyBunny(model, scene, world) {
  const bunny = {
    model: null,
    face: null,
    mesh: null,
    animation: {
      play: null,
      current: null,
      mixer: null,
      actions: {},
    },
    physics: {
      body: null,
    },
    isDragged: false,
  }

  setModel(model, scene)
  setAnimations(scene)
  setPhysics(world)

  function setModel(model, scene) {
    bunny.model = model.scene.children[0]
    bunny.model.position.set(0, 0, 0)
    scene.add(bunny.model)
    bunny.face = bunny.model.children.find(child => child.name === 'Face')

    bunny.face.material.transparent = true

    bunny.model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    bunny.mesh = bunny.model.children.find(
      child => child.name === 'Rabbit',
    ).children[0]
  }

  function setAnimations(scene) {
    // Mixer
    bunny.animation.mixer = new AnimationMixer(scene)
    bunny.animation.actions = model.animations.reduce((prev, animation) => {
      prev[animation.name.toLowerCase()] =
        bunny.animation.mixer.clipAction(animation)
      return prev
    }, {})

    // Set Iddle
    bunny.animation.current = bunny.animation.actions.iddle
    bunny.animation.current.play()

    // Play the action
    bunny.animation.play = name => {
      const newAction = bunny.animation.actions[name.toLowerCase()]
      const oldAction = bunny.animation.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      bunny.animation.current = newAction
    }
  }

  function setPhysics(world) {
    // TODO
    bunny.physics.shape = CannonUtils.CreateTrimesh(bunny.mesh)
    bunny.physics.body = new CANNON.Body({
      mass: 1,
      shape: bunny.physics.shape,
    })
    bunny.physics.body.position.set(0, 0, 0)
    bunny.physics.body.quaternion.setFromEuler(0, 0, 0)
    world.add(bunny.physics.body)
  }

  function update(delta) {
    bunny.animation.mixer.update(delta)
  }

  function dragBunny() {
    bunny.isDragged = true
    bunny.animation.play('grabbed')
  }

  function dropBunny() {
    bunny.isDragged = false
    bunny.animation.play('iddle')
  }

  return { ...bunny, update, dragBunny, dropBunny }
}
