import { useReducer, useCallback } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type ActionType<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  newPresent?: T;
};

const undoReducer = <T>(state: State<T>, action: ActionType<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case UNDO: {
      if (past.length === 0) break;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) break;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) break;

      return {
        past: [...past, newPresent],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }

  return state;
};

const useUndo = <T>(initPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);

  return [
    state,
    {
      set,
      undo,
      redo,
      reset,
      canRedo,
      canUndo,
    },
  ];
};

export default useUndo;
