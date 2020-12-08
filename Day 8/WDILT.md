# What did I learn today?

## How to clone a Deeply nested array
`function cloneArray(a){
  return a.map(e => Array.isArray(e) ? cloneArray(e) : e);
};`
