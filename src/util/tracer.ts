import { initTracer } from '@boxbag/xsh-node-tracing';

const tracer = initTracer(); // initialized in a different file to avoid hoisting.

export { tracer };
