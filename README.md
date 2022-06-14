## Abstract
TODO

---

## Topic list
- what is state
- which type of states we usually find
- how are they represented
- are they enclosed (local) or need to be shared (global//lifted)
- reusability study:
  - when state needs to be reused
  - native techniques
  - external libraries
  - keep the memory clean
  - state as cache?
- resources:
  - https://confluence.valtech.com/display/PRACTICE4FRONTEND/State+management+in+React
  - https://blog.logrocket.com/the-upsides-of-prop-drilling-in-react/

---

### What is state
> State is any information remembered so the app/system can work.

State is _local_ when it resides in the component it is used in (ex. a form state have sense to be in the component that handles its logic and downward).

State is _global_ when it's shared between every (most) component in the application (ex. the user login information are usually useful through the whole app).

State can reside on the _server_ (CRUD applications) on in the _client_ (Web Editors)

---
#### Which information we usually find?
- behavioral (hide/show a modal, animation-related info, etc..)
- input-related (forms, checkboxes, etc..)
- business-related (list of customer to be displayed, etc..)
- statistical (use has been on the page for xxx seconds)
---

### Problems with Global state
- it remains there for the whole session (or it needs to be cleaned-up)
- can be confusing (why this data is here? is it safe to reuse it for some other purpose? which components are depending on this?)
- doesn't scale up very well (the more stuff in the global scope the heavier the load on the memory if not properly destroyed when not necessary anymore)
- hard to name things (as the name needs to have a globally meaningful semantic)
### Advantages of Global state
- always available with no effort
- it remains there for the whole session (less data to re-download if used as a cache)
- no need to organize where to put it
- less refactoring needed (no lifting up or down when implementing new features)

### Advantages of Local State
- easy to name local state (as the locality gives some context)
- safer to delete (it's easy to track down usage)
- easy to understand what it's for (as it stays near its usages)

### Disadvantages of local state
- code might get significantly longer (although this is potentially mitigable)
- using similar local names in different places might result confusing (search and replace)
- it might require being lifted up or down if some specification change
- can cause a lot of prop passing

### Local or Global/Shared?
| Type | Local | Global | Note |
| --- | --- | --- | --- |
| behavioral | ✓ | ✓ | A state like the ___loading___ of a spinner don't need to be known in the whole application but can be local, and it should be for simplicity; something like a ___toast___ could be relying on a global list of currently displayed elements to avoid overlapping situation when multiple could be rendered from multiple components in the tree.
| input-related | ✓ |  | Even in complex forms, there's no need for the information to be shared globally, it may be convenient to lift it up to a certain point (usually the component where the form logic is handled) but there is where the data is ultimately consumed.

### how to share state?
- context
  - available from the provider component downward
  - do not require to pass the information down (prop drilling)
  - useful to handle state that is shared across a whole section of the application (or all of it)
- lifting up local state
  - keeps the state local where it's consumed
  - easy to track down
  - may cause prop drilling

## State management Patterns / Libraries
- Redux
  - predictable
  - easy to track where why when and how the state was updated
  - centralized
- MobX
  - minimalistic (no boilerplate code)
  - reactive
  - handles async operations with no additional effort
  - uses proxy
- Recoil
  - mobX with extra steps
  - simpler apis?
  - compatible out of the box with React 18 (since 0.0.11 it supports Concurrent Mode)
  - experimental
  - async out of the box
- Jotai
  - simplified version of recoil (4x smaller)
  - does not work with React Fast Refresh as atoms do not have a key
  - does not have shapshots (useful for testing and for inspecting)
  - stable persistent state apis
  - [interesting article](https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/?msclkid=20b0f121cf7d11ec91d6c54ab8622513) on the difference between Jotai and Recoil
- Zustand
  - async out of the box
  - centralized
- Valtio
  - uses proxies
- apollo client
  - graphQL
  - auto caching
  - server state
- React Query
  - server state
  - caching policies
  - 0 config
  - consistant request states out of the box (pending, data, error)
  - async / promise friendly
- React Table
  - headless table state management
  - spread operators
  - ugly APIs

Problem:
- long list of item
- info about each item is editable
- info about each item is displayed somewhere else in the tree
- info needs to be hoisted up to common ancestor
- the whole tree gets re-rendered upon updating 1 item since the common ancestor re-renders
- can't use a context provider each item as the length my vary and there's no way to insert a new context provider avoiding unmount and remount of the whole tree
Problem:
- undo functionality /// versioning
Note
- Remix, no sms needed as useLoadData takes care of it ???


## Practical App
### Recoil
- __atom__: store that mantains a list of subscribers (setter on local React values). Every time one of the setState is called, each other is as well.
- __useRecoilState__: creates a local state (with useState), passes the setter to the atom (who's passed in as parameter to the hook) and handles the cleanup on unmount.
- it should work with async batching
- the complexity grows on the number of subscribers of each shared state
- no boilerplate
- shared state is not global

### Redux Toolkit
- setup store
- setup actions
- setup selectors (or inline in mapStateToProps)
- wrap components with connect
- global state
- every top-level selector is rerun each action.
- even if connect helps not rerendering any unnecessary component the amount of computations from the selectors themselves makes scalability an issue.
- i knew it (had experience with it) and still took more time then recoil and continuous looking into the documentation

### MobX
- define store as a class, add mutation methods
- only use observable values in observer components
- pass store around (probably context preferred)
- very little boilerplate (only define observer components as such)
- global and/or local state
- only who's observing the actual value gets rerendered
- requires some insight on how the library work (not immediate to use)