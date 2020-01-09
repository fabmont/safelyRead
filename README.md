
# safe-read
A Javascript utility for access nested objects safely.

## Motivation
Let's imagine you're consuming data from an API and some data inside the object given from this API doesn't exist. Your front-end should crash because of that, so using safe-read will garantee that if the property exist, you'll get it, or transform it, otherwise, will give to you a fallback result.
SafeRead enhance the Lodash's **get** util by provinding a transform parameter that you can modify the result of the object property.

## Instalation

1. Install the last version of safe-read:
`npm install cpf-check --save`

2. Import it into your project:
`const safeRead = require('cpf-check');`
`// or if you're using ES6+`
`import CPF from 'cpf-check';`

## Usage
SafeRead provides a function that accepts four parameters.
1. **required** `{Object}`: The object you want to go through;
2. **required** `{Array<String>}`: An array of paths that each position is an element of your object;
3. **required**  `{Any}`: The fallback result, if anything go wrong with the path it will return instead;
4. **optional** `{Function}`: A function that will be triggered if the path exists.

Imagine that you have declared an object:

    const user = {
	  name: 'Bruce Wayne',
	  age: 30,
	  hero: 'Batman',
	};

And for some reason you want to access the age property of the object above by using safeRead.

    safeRead(user, ['age'], 'Age not found.', (age) => `${age} years old`);

If  `user.age` exists, so the fourth parameter will be triggered (returning '30 years old').
NOTE: if you didn't pass the transform function and `user.age` exist, so it will return '30' to you.

What if safeRead can't access the property I want?

    safeRead(user, ['car'], 'This property doesn't exist.');
  
  The `user` object doesn't contain any `car` property, so safeRead will return the third parameter (`This property doesn't exist.`).
