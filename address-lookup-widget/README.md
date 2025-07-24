address-lookup-widget
======

Adaptive Form provides ability to configure a cutom widget for a particular field or set of fields. It exposes certain APIs and event that the custom widget has to implement and dispatch in order to work well with rest of the Adaptive Form infrastructure. This package contains two custom widgets:

1. **Address Lookup Widget** - A custom address lookup widget which is based on [jquery autocomplete widget] (http://jqueryui.com/autocomplete/) and pulls data from [geonames.org](http://www.geonames.org/) REST endpoint.

2. **Generic Autocomplete Dropdown Widget** - A reusable autocomplete widget that extends the standard dropdown functionality to provide real-time filtering and keypress-based change events.

This a content package project generated using the simple-content-package-archetype. This package would contain the widget javascript under /etc/clientlibs/custom-widgets/addresslookup folder and a sample Adaptive Form demonstrating usage of the widget at http://localhost:4502/content/forms/af/widget-sample/addreslookupsample.html once that package is deployed.

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

Using with VLT
--------------

To use vlt with this project, first build and install the package to your local CQ instance as described above. Then cd to `src/main/content/jcr_root` and run

    vlt --credentials admin:admin checkout -f ../META-INF/vault/filter.xml --force http://localhost:4502/crx

Once the working copy is created, you can use the normal ``vlt up`` and ``vlt ci`` commands.

Specifying CRX Host/Port
------------------------

The CRX host and port can be specified on the command line with:
mvn -Dcrx.host=otherhost -Dcrx.port=5502 <goals>


_Note: We have used demo account for accessing geonames REST endpoint which may hit daily limit of demo account request counts. You can register and use your own user account for accessing geonames services. Few details [here](http://www.geonames.org/export/JSON-webservices.html)._
