# react-native-intro-carousel
An introduction page carousel animated with pagination
## Installation

```sh
npm install react-native-intro-carousel
```

or

```sh
yarn add react-native-intro-carousel
```

## Usage

```js
import Carousel from "react-native-intro-carousel";

// ...

<Carousel
  data={[
    {
      title: 'Cool package',
      description: 'This is a cool package',
      backgroundColor: '#59b2b7',
      banner: image,
      titleStyle: {
        color: 'white',
      },
      descriptionStyle: {
        color: 'white',
      },
    },
  ]}
  paginationConfig={{
    dotSize: 20,
  }}
/>
```

## Props

| Name             | Type                    | Default        | Description                |
|------------------|-------------------------|----------------|----------------------------|
| data             | object                  | None, required | Array of pages in carousel |
| paginationConfig | {   dotSize?: number, } | None           |                            |
|                  |                         |                |                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
