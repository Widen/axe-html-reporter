# axe-reporter-html

## 2.0.0

### Major Changes

- cbcd18e: Fix CJS interop. This change generally shouldn't be breaking, but in case it is,
  it's being marked as a major change. The result of this change is that ESM and
  CJS should both work as intended without needing to do `require().default`
  tricks.

## 1.1.0

### Minor Changes

- ba16bcf: Update dependencies

## 1.0.0

### Major Changes

- f7089e7: Update to ESM-first. CommonJS is still supported.

## 0.1.2

### Patch Changes

- 1b711c9: Fix multiple nodes not displaying properly

## 0.1.1

### Patch Changes

- 4d174d2: Add missing type declarations.
- 4d174d2: Add missing template to output directory.

## 0.1.0

### Minor Changes

- e4c53cf: Completely rewrite package
