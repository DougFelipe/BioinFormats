// Type declarations for YAML file imports
// Allows TypeScript to understand .yaml and .yml file imports

declare module '*.yaml' {
    const data: unknown;
    export default data;
}

declare module '*.yml' {
    const data: unknown;
    export default data;
}
