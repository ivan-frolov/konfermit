/**
 * Options for OperationManager constructor.
 * The DEFAULT.excluded parameter defines regexps for methods of obj
 * witch will be ignored in application of decoration
 * @type {{excluded: String[]}}
 */
export const DEFAULT = {excluded: ['constructor', 'setState', 'getState', '_[$a-zA-Z_][0-9a-zA-Z_$]*']}
/**
 * The Manager which provide undo redo operations for array of objects 'state' passed to constructor.
 * More over it decorates all methods that not matched by DEFAULT.excluded masks by invoking this.saveToHistory method
 * which push whole clone of state array into inner this._history property.
 *
 * So, the undo redo operations is done by cloning whole _state. It quite rude approach (due to memory consumption
 * and speed decreasing on huge objects), but I'm not sure that the aim of this test work is confirmation of knowledge
 * immutable, sharing states structures.
 */
export default class OperationManager {
  /**
   * @param {Object} obj, which methods should be wrapped with save to history functionality,
   * must implement setState() method the obj._state property will be used to preserve, it must implement clone method.
   * @param {Object} options array of options
   */
  constructor (obj, options = {}) {
    this._obj = obj
    // if (!Array.isArray(state)) {
    //   throw new Error('You can save to history only array of objects')
    // }
    this._options = Object.assign({}, DEFAULT, options)
    /**
     * Array of _state snapshots
     * @type {Array}
     * @private
     */
    this._history = [this._getStateCopy()]
    this._currentIndex = 0
    this._decorate()
  }

  _decorate () {
    const excludedRe = new RegExp(`^${this._options.excluded.join('|')}$`)
    Object.getOwnPropertyNames(Object.getPrototypeOf(this._obj)).forEach((methodName) => {
      let method = Object.getPrototypeOf(this._obj)[methodName]
      if (!excludedRe.test(methodName) && (method instanceof Function)) {
        Object.defineProperty(this._obj, methodName, {value: this.saveToHistory(method)})
      }
    })
  }

  saveToHistory (fn) {
    let self = this
    return function (...args) {
      let result = fn.apply(this, args)
      self._history = self._history.slice(0, ++self._currentIndex)
      self._history.push(self._getStateCopy())
      return result
    }
  }

  /**
   * It's a difficult task to make deep copy of some object, this why I decided to put this work on object
   * (of course I could use some extension to do this work, but I'm not sure that it's right for this test).
   * @return {Object}
   * @private
   */
  _getStateCopy () {
    if (!this._obj._state.clone) {
      throw new Error(`Object ${state.constructor.name} should have clone method`)
    }
    return this._obj._state.clone()
  }

  /**
   * The main function to undo state back
   * @return {OperationManager}
   */
  undo () {
    if (this.canUndo()) {
      this._currentIndex--
      this._copyHistoryToState(this._currentIndex)
    }
    return this
  }

  /**
   * The main function to redo state forward
   * @return {OperationManager}
   */
  redo () {
    if (this.canRedo()) {
      this._currentIndex++
      this._copyHistoryToState(this._currentIndex)
    }
    return this
  }

  _copyHistoryToState (indexOfHistory) {
    this._obj.setState(this._history[indexOfHistory])
    return this
  }

  /**
   * @return {boolean}
   */
  canUndo () {
    return this._currentIndex > 0
  }

  /**
   * @return {boolean}
   */
  canRedo () {
    return this._currentIndex < (this._history.length - 1)
  }
}