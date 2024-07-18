```markdown
# Selectz

Selectz is a custom JavaScript select component that allows for flexible and dynamic select elements with custom styling and functionality.

## Features

- Customizable select component
- Keyboard navigation support (Arrow keys and Enter)
- Programmatic option management
- Event handling for option changes

## Installation

Include the `selectz.js` file in your project.

```html
<script src="path/to/selectz.js" type="module"></script>
```

Or import it into your JavaScript file.

```javascript
import Selectz from './path/to/selectz.js';
```

## Usage

### HTML

Create a standard HTML select element.

```html
<select id="mySelect">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

### JavaScript

Initialize the custom select component and add options programmatically.

```javascript
import Selectz from './path/to/selectz.js';

const select = new Selectz('#mySelect', { 
    onchange: e => {
        console.log(e);
    }
});

// Add options programmatically
select.addOptions([
    { text: 'Additional Option 1', value: 'additional_option_1' },
    { text: 'Additional Option 2', value: 'additional_option_2' },
]);

// Set selected option programmatically
select.setSelectedOption('additional_option_1');

// Clear all options
select.clearOptions();
```

## API

### `addOptions(options, [index])`

Add new options to the select component.

- **options**: Array of options to add. Each option should be an object with `text` and `value` properties.
- **index** (optional): Index at which to insert the new options. If not provided, options will be added to the end.

```javascript
select.addOptions([
    { text: 'Option 4', value: '4' },
    { text: 'Option 5', value: '5' },
], 2);
```

### `removeOption(value)`

Remove an option from the select component by its value.

- **value**: The value of the option to remove.

```javascript
select.removeOption('4');
```

### `setSelectedOption([value])`

Set the selected option programmatically.

- **value** (optional): The value of the option to select. If no value is provided, the selection will be cleared.

```javascript
select.setSelectedOption('5');
```

### `clearOptions()`

Clear all options from the select component.

```javascript
select.clearOptions();
```

## Event Handling

### `onchange`

The `onchange` option is a callback function that is triggered whenever the selected option changes. The callback receives an object with the `text` and `value` of the selected option.

```javascript
const select = new Selectz('#mySelect', { 
    onchange: e => {
        console.log('Selected option:', e);
    }
});
```

## Styling

You can customize the styling of the select component by targeting the following CSS classes:

- `.selectz-container`
- `.selectz-selected-option`
- `.selectz-droplist-container`
- `.selectz-option-container`
- `.selectz-input`
- `.selectz-option`
- `.selectz-option-active`

Example:

```css
.selectz-container {
    border: 1px solid #ccc;
    padding: 5px;
}

.selectz-selected-option {
    background-color: #f9f9f9;
    padding: 10px;
    cursor: pointer;
}

.selectz-droplist-container {
    display: none;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
}

.selectz-droplist-container.show {
    display: block;
}

.selectz-option-container {
    max-height: 200px;
    overflow-y: auto;
}

.selectz-option {
    padding: 10px;
    cursor: pointer;
}

.selectz-option-active {
    background-color: #f0f0f0;
}
```

## License

This project is licensed under the MIT License.
```

Feel free to customize the `README.md` as needed to better fit your project and usage.