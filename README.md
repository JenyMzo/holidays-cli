# upcoming-holidays-cli

![upcoming-holidays-cli](public/banner.png?raw=true "upcoming-holidays-cli")
CLI built in Node.js that retrieves the next 5 occurring public holidays in a given country.

## Installation

```
$ npx upcoming-holidays-cli
```

## Node.js version
This project uses Node.js version `16.17.0`.

If you have ```nvm``` installed, you can get the project's Node.js version by running:

```
nvm use
```

## Usage
In order to use the CLI, you need to pass the country code as an argument. You can find the list of supported country codes [here](https://date.nager.at/Country).

```
$ npx upcoming-holidays-cli --countryCode=DE
```
