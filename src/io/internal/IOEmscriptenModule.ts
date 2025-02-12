import IOComponent from './IOComponent.js'
import IOPixel from './IOPixel.js'

interface IOEmscriptenModule {
  IOComponentType: typeof IOComponent
  IOPixelType: typeof IOPixel
}

export default IOEmscriptenModule
