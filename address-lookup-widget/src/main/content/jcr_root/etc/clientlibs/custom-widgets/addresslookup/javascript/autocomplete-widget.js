/******************************************************************************
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 *****************************************************************************/

(function($) {
    // Creating a generic autocomplete widget extending the dropDownList
    $.widget( "xfaWidget.autoComplete", $.xfaWidget.dropDownList, {

        _widgetName: "autoComplete",

        options: {
            minLength: 2,              // Minimum characters before filtering
            editable: true             // Make the dropdown editable for typing
        },

        getOptionsMap: function() {
            var parentOptionsMap = $.xfaWidget.dropDownList.prototype.getOptionsMap.apply(this, arguments);
            return $.extend({}, parentOptionsMap, {
                "items": function(val) {
                    debugger;
                    // Store all items for filtering
                    this.options.items = val;
                    
                    // Populate datalist when items are set/updated
                    if (this.$datalist) {
                        this._populateDatalist(this.$datalist, val || []);
                    }
                    
                    // Don't call parent items handler since we're using input+datalist instead of select+options
                }
            });
        },

        getEventMap: function() {
            var parentEventMap = $.xfaWidget.dropDownList.prototype.getEventMap.apply(this, arguments);
            return $.extend({}, parentEventMap, {
                "onKeyInput.autoComplete": xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT
            });
        },

        // Override render to create input + datalist structure
        render: function() {
            var $control = $.xfaWidget.dropDownList.prototype.render.apply(this, arguments);
            
            if ($control) {
                var that = this;
                
                // Make the dropdown editable by replacing with input + datalist
                var $input = $('<input type="text" />');
                var $datalist = $('<datalist></datalist>');
                var datalistId = _.uniqueId("autocomplete-datalist-");
                
                $datalist.attr('id', datalistId);
                $input.attr('list', datalistId);
                $input.attr('name', $control.attr('name'));
                $input.attr('style', $control.attr('style'));
                
                // Copy classes and attributes
                this.copyAttributesFromSrcToDest($control, $input);
                
                // Replace the select with input + datalist
                $control.after($input).after($datalist).remove();
                $control = $input;
                
                // Store datalist reference for items setter
                this.$datalist = $datalist;
                
                // Set up keypress filtering
                $control.on('input keyup', function(event) {
                    var term = $(this).val();
                    
                    // Filter items based on input
                    if (term.length >= that.options.minLength) {
                        that._filterAndRenderItems(term);
                    } else {
                        // Show all items if below min length
                        that._populateDatalist(that.$datalist, that.options.items || []);
                    }
                    
                    // Trigger change event on keypress (commit event)
                    that._triggerChangeEvent(event, term);
                });
            }
            
            return $control;
        },

        _filterAndRenderItems: function(term) {
            if (!this.options.items || !this.$datalist) return;
            
            // Filter items based on display text
            var filteredItems = _.filter(this.options.items, function(item) {
                var displayValue = item.display || item.save || '';
                return displayValue.toLowerCase().indexOf(term.toLowerCase()) !== -1;
            });
            
            this._populateDatalist(this.$datalist, filteredItems);
        },

        _populateDatalist: function($datalist, items) {
            $datalist.empty();
            
            _.each(items, function(item) {
                var $option = $('<option></option>');
                $option.attr('value', item.save || '');
                $option.text(item.display || item.save || '');
                $datalist.append($option);
            });
        },

        _triggerChangeEvent: function(event, newValue) {
            // Update the widget's value
            this._setOption("value", [newValue]);
            
            // Trigger the XFA change event with proper structure (similar to TextField)
            this.$userControl.trigger({
                type: "onKeyInput.autoComplete",
                originalType: event.type,
                character: newValue || "",
                keyCode: event.keyCode || 0,
                charCode: event.charCode || 0,
                which: event.which || 0,
                ctrlKey: event.ctrlKey || event.metaKey || false,
                shiftKey: event.shiftKey || false,
                keyDown: false
            });
        },

        // Override methods to work with the new input structure
        getCommitValue: function() {
            return [this.$userControl.val()];
        },

        showValue: function() {
            if (!this._isValueSame()) {
                this.$userControl.val(this.options.value && this.options.value[0] || "");
            }
        },

        showDisplayValue: function() {
            this.$userControl.val(this.options.displayValue && this.options.displayValue[0] || "");
        },

        // Utility method to check if values are same
        _isValueSame: function() {
            var currentValue = this.$userControl.val();
            var optionValue = this.options.value && this.options.value[0];
            return currentValue === (optionValue || "");
        }

    });
})(jQuery); 