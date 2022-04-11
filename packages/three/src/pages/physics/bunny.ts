import { AnimationMixer } from 'three'

export default class UglyBunny {
  model = null
  face = null
  animation = {
    play: null,
    current: null,
    mixer: null,
    actions: {},
  }
  constructor(model, scene, world) {
    this.setModel(model, scene)
    /*   this.setAnimations(model)
    this.setPhysics(world) */
  }

  setModel(model, scene) {
    this.model = model.scene.children[0]
    this.model.position.set(0, 0, 0)
    scene.add(this.model)
    this.face = this.model.children.find(child => child.name === 'Face')
    this.face.material.transparent = true

    this.model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  setAnimations(model) {
    // Mixer
    this.animation.mixer = new AnimationMixer(model.scene)
    this.animation.actions = model.animations.reduce((actions, animation) => {
      actions[animation.name.toLowerCase()] =
        this.animation.mixer.clipAction(animation)
      return actions
    })

    // Set Iddle
    this.animation.current = this.animation.actions.iddle
    this.animation.current.play()

    // Play the action
    this.animation.play = name => {
      const newAction = this.animation.actions[name.toLowerCase()]
      const oldAction = this.animation.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.current = newAction
    }
  }

  setPhysics(world) {}

  update(delta) {
    this.animation.mixer.update(delta * 0.001)
  }
}
