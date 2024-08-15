---
'axe-reporter-html': major
---

Fix CJS interop. This change generally shouldn't be breaking, but in case it is,
it's being marked as a major change. The result of this change is that ESM and
CJS should both work as intended without needing to do `require().default`
tricks. 
