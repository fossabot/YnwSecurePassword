# [YnwSecurePassword](http://ynwteam.tech/YnwSecurePassword)

##### A JavaScript secure password library for generating and validate a secure password.

[![npm version](https://badge.fury.io/js/ynw-secure-password.svg)](https://badge.fury.io/js/ynw-secure-password)
[![Build Status](https://travis-ci.com/YNW-Team/YnwSecurePassword.svg?branch=main)](https://travis-ci.com/YNW-Team/YnwSecurePassword)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/YNW-Team/YnwSecurePassword/badge.svg?branch=main)](https://coveralls.io/github/YNW-Team/YnwSecurePassword?branch=main)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FYNW-Team%2FYnwSecurePassword.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FYNW-Team%2FYnwSecurePassword?ref=badge_shield)

## Features

- ✨ Generate secure password
- ✅ Validator password

## Installation

Install using NPM:

`npm install ynw-secure-password`

Install using YARN:

`yarn add ynw-secure-password`

## Usage

- ### Generator

```ts
import YnwSecurePassword from 'ynw-secure-password';

// generator without arg, it will use default config
const password_without_arg = YnwSecurePassword.generator();
console.log(password_without_arg);

// generator with length (must be equal 0 or great than or equal 4), it will use default config
const password_with_length = YnwSecurePassword.generator(10);
console.log(password_with_length);

// generator with config (must be validated), it will use default config
const config = {
	length: 15,
	rules: [
		{
			chars: 'abcde',
		},
		{
			chars: '01234',
			min: 1,
		},
		{
			chars: 'AZERTY',
			min: 2,
		},
	],
};
const password_with_config = YnwSecurePassword.generator(config);
console.log(password_with_config);
```

- ### Validator

```ts
import YnwSecurePassword from 'ynw-secure-password';

// generator without arg, it will use default config
const password_without_arg = YnwSecurePassword.validator('Ynw-Secure-Password');
console.log(password_without_arg.isValid);

// generator with length (must be great thanor equal 4), it will use default config
const password_with_length = YnwSecurePassword.generator('Ynw-Secure-Password', 10);
console.log(password_with_length.isValid);

// generator with config (must be validated), it will use default config
const config = {
	length: 15,
	rules: [
		{
			chars: 'abcde',
		},
		{
			chars: '01234',
			min: 1,
		},
		{
			chars: 'AZERTY',
			min: 2,
		},
	],
};
const password_with_config = YnwSecurePassword.validator('Ynw-Secure-Password', config);
console.log(password_with_config.isValid);
```

## License

[YnwSecurePassword](http://ynw-tema/YnwSecurePassword) is freely distributable under the terms of the [MIT license](LICENSE).
