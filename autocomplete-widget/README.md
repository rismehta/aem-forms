## Generic Autocomplete Dropdown Widget

### Usage

To use the generic autocomplete dropdown widget:

1. Add a **Drop-down List** component to your Adaptive Form
2. Open the component's **Edit Dialog**
3. Go to the **Basic** tab
4. In the **CSS Class** field, add: `widget_autoComplete`
5. Save and preview your form

### How It Works

The generic autocomplete widget (`xfaWidget.autoComplete`) extends the standard dropdown list widget (`xfaWidget.dropDownList`) to provide enhanced functionality:

This a content package project generated using the simple-content-package-archetype. This package would contain the widget javascript under /etc/clientlibs/custom-widgets/autocomplete folder and a sample Adaptive Form demonstrating usage of the widget at http://localhost:4502/content/forms/af/widget-sample/autocomplete.html once that package is deployed.

#### Technical Implementation

- **HTML5 Structure**: Replaces the standard `<select>` element with an `<input>` + `<datalist>` combination for better autocomplete support
- **Real-time Filtering**: As users type, the widget filters the available options based on the display text using case-insensitive matching
- **Keypress Change Events**: Unlike standard dropdowns that trigger change events on focus out, this widget fires change events on every keypress for real-time validation and processing
- **Dynamic Option Management**: Uses the same `items` property as standard dropdowns, so options can be populated dynamically from external sources

#### Key Features

- **Minimum Length Threshold**: Configurable minimum character count before filtering begins (default: 2)
- **Seamless Integration**: Works with existing Adaptive Form validation, rules, and event handling
- **Accessibility**: Maintains proper ARIA attributes and keyboard navigation
- **Mobile Friendly**: Uses native HTML5 autocomplete for better mobile experience

Building
--------

This project uses Maven for building (Minimum maven version 3.1.0). Common commands:

From the project directory, run ``mvn clean install`` to build the bundle and content package and install to a CQ instance.
