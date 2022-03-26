# Currying in Javascript 

> Currying in Javascript. This repo contains the code used in the "Curry" JS Guild Talk.

Currying is a process in functional programming in which we can transform a function with multiple arguments into a sequence of nesting functions. In other words, It returns a new function that expects the next argument. From `f(x, y, z)` to `f(x)(y)(z)`.

```
curry :: ((x, y, ...) -> c) -> x -> y -> ... -> c
```

Currying breaks down a function by its *arity* (Arity is the number of arguments taken by a function) into a series of functions that take only one argument.

Note: An American mathematician named Haskell Curry developed this technique; that's why it is called currying.

## The basic Javascript Curry

Here is an example.

```javascript
function add(x, y) {
  return x + y;
}
```

The function `add` take two arguments.

```javascript
function add(x) {
  return function (y) {
    return x + y;
  }
}
```

The function `add` takes one argument and returns a function.  The returned function remembers the first argument from then on via the closure by calling it.
```javascript
function add(x) {
  return function (y) {
    return x + y;
  }
}

const plusTen = add(10)
plustTen(2) // 12
```

## Why should I use curry?

There are several reasons why we should use curry.

* Enforce pure functions.
* Avoid boilerplate code.
* Declarative code, taking care about the *what* instead of the *how*.
* The creation of functions to set up different configurations for project infrastructure.
* Partial application. (Curry and Partial Application are different concepts, but highly related)

All the reasons above can be summarized in one main reason. *composition*.

Currying allows us to create new functions with pre-defined data in the closure scope; this removes duplicated code and isolates expensive processes.

### When should I use curry?

* Do you need to compose reusable code blocks?
* Do you need to ensure your functions only have a single argument?

Let's see these advantages with further examples.
## Advanced Curry

The following code is a function for currying any function given.

```javascript
function curry(fn) {
  return function $curry(...args) {
    return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
  }
}
```
The function `curry` is a *higher-order function*, which means a function that takes a function as an argument or returns a function.

In this case, `curry` returns `$curry`. `$curry` receives an argument with the spread operator `(..args)`, and it compares the arity `fn.length` to return a function `$curry.bind(null, ...args)` or call the original function `fn(...args)`.

Let's see the implementation with a 3-arity function.

```javascript
function add(x, y, z) {
  return x + y + z;
}
```

To better understand this `curriedAdd,` we may divide it into four parts:

```javascript
const curriedAdd = curry(add); // returns `$curry` function.

const add1 = curriedAdd(5); // returns a function with the number 1 binded.

const add2 = add1(6); // returns a function with the number 1 and 2 binded.

const result = add2(7); // non function returned, this time is the result.

result; // 18
```

Now, let's know how it works on the first call.

```javascript
const curriedAdd = curry(add); // returns `$curry` function.
```

`curriedAdd` is `$curry` ready to receive `args` and check its length versus `add` function arity `fn.length`

```javascript
return function $curry(...args) {
  return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
}
```

The following code call goes:

```javascript
const add1 = curriedAdd(5); // returns a function with the number 1 binded.
```

If the arguments passed are less than the original function arity, create a new function with the attached argument. In other words. `args.length` is less than `fn.length`, then return a new function with all the `...args` bonded to `$curry`.

* That is why we use `args` with the spread operator.
* That is why the `$curry` function is not an anonymous function.
* That is why we are using `bind`. The `bind()` function creates a new bound function that wraps the original function object, `$curry` with `args`. 

The previous explanation translated into code would be like this:

At this point:

* `args.length` is equal to `1`.
* `args` is equal to `[5]`.
* `fn.length` is equal to `3`.

```javascript
//              ...args
function $curry(...[5]) {
// return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
  return 1 < 3 ? $curry.bind(null, ...[5]) : fn(...[5])
}
```

Lets see the following code call:

```javascript
const add2 = add1(6);
```

At this point:

* `args.length` is equal to `2`.
* `args` is equal to `[5, 6]`.
* `fn.length` is equal to `3`.

```javascript
//              ...args
function $curry(...[5, 6]) {
// return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
  return 2 < 3 ? $curry.bind(null, ...[5, 6]) : fn(...[5, 6])
}
```

And the final code goes like this:

```javascript
const result = add2(7);
```

At this point:

* `args.length` is equal to `3`.
* `args` is equal to `[5, 6, 7]`.
* `fn.length` is equal to `3`.

```javascript
//              ...args
function $curry(...[5, 6, 7]) {
// return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
  return 3 < 3 ? $curry.bind(null, ...[5, 6, 7]) : fn(...[5, 6, 7])
}
```

At this moment, we fulfilled the the 3 arguments required to call the function, so we return `fn(...[5, 6, 7])` that means `result = fn(...[5, 6, 7]) = fn(x, y, z) = 18`.

As we can see, curried functions have a built-in iterator behavior.

## Example: Email Setup

As I mentioned before, using curry is useful when we create project setups, and in this example, we will use curry to generate an email set up to send emails.

```javascript
const emailSetup = curry(
  (config, template, to) => `FROM: ${config.from}\n TO: ${to}\n\n${template}`
);
```

Now, we have an `emailSetup` curried function. In this example, the curried function takes three arguments. `config`, which serves as an example for a simple configuration, `template` that is the email template; and finally receives `to`, that is the email address that is going to receive the email.

We have the following requirement:

*As a user, I would like to receive an email when I sign up to set up an account to use the app.*

Let's create a function based on our configuration from `emailSetup`.

```javascript
const emailSender = emailSetup({ from: 'test@email.com' });
```

And from `emailSender`, we can create a function with the template pre-loaded.

```javascript
const sendSetupEmailTo = emailServer('<a href="http://127.0.0.1">click here!</a>');
```

`sendSetupEmailTo` only needs an email address to send the email.

Let's say we have the following requirement.

*As an administrator, I would like to receive a notification when a user requests to join my organization.*

We can curry our `emailSender` to receive different templates and emails like this.

```javascript
const sendNotificationTo = curry(
  (email, template) => emailServer(template)(email)
);
```

At this moment we can take care of creating different templates:

```javascript
const requestToJoinFrom = (userEmail) => `${userEmail} wants to join!`;
```

And our function to send email would be like this:

```javascript
const sendNotificationToAdmin = sendNotificationTo('admin@test.com');

sendNotificationToAdmin(
  requestToJoinFrom('user@test.com')
)
```

Let's take a look at another requirement.

*As an administrator, I would like to receive a notification when a user sent me message.*

We already have `sendNotificatioToAdmin` function, so we only need to take care of the template:

```javascript
const messageFrom = (userEmail) => `${userEmail} sent you a message!`;
```

So we finally can create the following function to send an email notification:

```javascript
sendNotificationToAdmin(
  messageFrom('user@test.com')
)
```

Developing new features is easy now. We create declarative code that takes care of *what* needs to be done instead of *how*, and we void boiler plate code.

These are how our functions look like, ready to be used in some endpoint or service:

```javascript

// As a user, I would like to receive an email when I sign up to set up an account to use the app.
sendSetupEmailTo('gchavez@ucol.mx');


// As an administrator, I would like to receive a notification when a user requests to join my organization.
const sendNotificationToAdmin = sendNotificationTo('admin@ucol.mx');
sendNotificationToAdmin(
  requestToJoinFrom('gchavez@ucol.mx')
);

// As an administrator, I would like to receive a notification when a user sent me message.
sendNotificationToAdmin(
  messageFrom('gchavez@ucol.mx')
);
```

We can even create generic higher functions to take care of most of the issues:

```javascript
const match = curry(
  (what, str) => str.match(what)
);

const replace = curry(
  (what, replacement, str) => str.replace(what, replacement)
);

const filter = curry(
  (fn, arr) => arr.filter(fn)
);

const map = curry(
  (fn, arr) => arr.map(fn)
);
```

Note that primary arguments should be placed at the end to facilitate function composition, and arguments that are least likely to change should be placed left most to enable partially applied functions.

## Conclusions

Curry is a taste of functional programming techniques that can be useful to remove code duplication, develop features faster by creating reusable code, etc. We can make new, valuable functions on the fly simply by passing in a few arguments.

## References
* https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch04
* https://medium.com/dailyjs/why-the-fudge-should-i-use-currying-84e4000c8743
* https://dev.to/iamawaisakram/currying-function-and-it-s-advantages-5fgf
* https://dev.to/cglikpo/currying-in-javascript-1jke
* https://blog.logrocket.com/understanding-javascript-currying/
* https://zetcode.com/javascript/currying/
* https://stackify.com/javascript-currying-vs-partial-application/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
