// Jasmine expect function to avoid Cypress type conflicts in unit tests
export const jasmineExpect = (actual: any) => {
  return {
    toBeTruthy: () => {
      if (!actual) {
        throw new Error('Expected value to be truthy');
      }
    },
    toBeFalsy: () => {
      if (actual) {
        throw new Error('Expected value to be falsy');
      }
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
      }
    },
    toContain: (expected: any) => {
      if (!actual || !actual.includes) {
        throw new Error('Expected value to be an array or string');
      }
      if (!actual.includes(expected)) {
        throw new Error(`Expected ${actual} to contain ${expected}`);
      }
    },
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${actual} to be ${expected}`);
      }
    },
    toBeDefined: () => {
      if (actual === undefined) {
        throw new Error('Expected value to be defined');
      }
    },
    toBeUndefined: () => {
      if (actual !== undefined) {
        throw new Error('Expected value to be undefined');
      }
    },
    toBeNull: () => {
      if (actual !== null) {
        throw new Error('Expected value to be null');
      }
    },
    toHaveBeenCalled: () => {
      if (!actual || typeof actual.calls === 'undefined') {
        throw new Error('Expected spy to have been called');
      }
      if (actual.calls.count() === 0) {
        throw new Error('Expected spy to have been called');
      }
    },
    toHaveBeenCalledWith: (...args: any[]) => {
      if (!actual || typeof actual.calls === 'undefined') {
        throw new Error('Expected spy to have been called');
      }
      const calls = actual.calls.all();
      const found = calls.some((call: any) => 
        call.args.length === args.length && 
        call.args.every((arg: any, index: number) => 
          JSON.stringify(arg) === JSON.stringify(args[index])
        )
      );
      if (!found) {
        throw new Error(`Expected spy to have been called with ${JSON.stringify(args)}`);
      }
    }
  };
}; 