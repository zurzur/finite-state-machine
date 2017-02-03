class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config != null)
        {
            this.history = [[config.initial, null]];
            this.currentHistoryIndex = 0;
            this.rules = config;
            this.activeState = config.initial;
        } else throw new Error();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.rules.states) {
            this.activeState = state;
            this.history.push([this.activeState, 's']);
            this.currentHistoryIndex += 1;
        } else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.rules.states[this.activeState].transitions) {    
            this.activeState = this.rules.states[this.activeState].transitions[event];
            this.history.push([this.activeState, 't']);
            this.currentHistoryIndex += 1;
        } else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.rules.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        if (event==null) {
            for ( var key in this.rules.states) arr.push(key); 
        }  else {
                for (var key in this.rules.states){
                    for (var key1 in this.rules.states[key].transitions) {
                        if (event in this.rules.states[key].transitions 
                            && arr.indexOf(key) == -1) arr.push(key);
                    }
                }
            }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 1 || this.currentHistoryIndex == 0) 
            return false;
        else {
            this.currentHistoryIndex -= 1;
            this.activeState = this.history[this.currentHistoryIndex][0];
            this.history[this.currentHistoryIndex][1] = null;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ( this.history.length == 1
            || this.currentHistoryIndex == (this.history.length - 1)
            || this.history[this.currentHistoryIndex][1] != null ) 
            return false;
        else { 
            this.currentHistoryIndex += 1;
            this.activeState = this.history[this.currentHistoryIndex][0];
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 1;
        this.currentHistoryIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
