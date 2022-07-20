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
      backgroundColor: '#e879f2',
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

## Demo

![Demo](/assets/demo.gif?raw=true "Demo")

## Props

| Name             | Type            | Default        | Description                                                  |
|------------------|-----------------|----------------|--------------------------------------------------------------|
| data             | object          | None, required | Array of pages in carousel                                   |
| paginationConfig | see table below | None           | Pagination configurations                                    |
| renderItem       | function        | None           | You can create your own component to be rendered on the page |

### `paginationConfig`

| Name            | Type    | Default   | Description                                                                                 |
|-----------------|---------|-----------|---------------------------------------------------------------------------------------------|
| dotSize         | number  | 15        | Size of pagination dots                                                                     |
| bottomOffset    | number  | 50        | pagination distance from bottom                                                             |
| animated        | boolean | true      | allows disabling dots animation                                                             |
| disabled        | boolean | false     | hide the pagination                                                                         |
| dotIncreaseSize | number  | 1.4       | size the dot will grow when it is on a page (hint: use 1 if you don't want the dot to grow) |
| color           | string  | #ffffff80 | Default dot color                                                                           |
| activeColor     | string  | #fff      | Active dot color                                                                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
