// src/jasmine-matchers.d.ts
import "jasmine";

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeTrue(): void;
            toBeFalse(): void;
        }
    }
}
