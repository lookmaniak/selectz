/**
 * Selectz - A custom select component
 * @param {string} elem - The CSS selector of the select element to replace
 * @param {Object} opts - Options for the custom select component
 */
function Selectz(elem, opts) {
    // Merge user options with default options
    let defaultOptions = {
        onchange: function() {},
        options: [],
        ...opts
    };

    const el = document.querySelector(elem);
    if (!el) throw new Error('Element not found');

    // Create necessary DOM elements for the custom select
    const elContainer = document.createElement('div');
    elContainer.classList.add('selectz-container');

    const elSelect = document.createElement('div');
    elSelect.classList.add('selectz-selected-option');
    elContainer.appendChild(elSelect);

    const elDroplistContainer = document.createElement('div');
    elDroplistContainer.classList.add('selectz-droplist-container');

    const elOptContainer = document.createElement('div');
    elOptContainer.classList.add('selectz-option-container');

    const elInput = document.createElement('input');
    elInput.classList.add('selectz-input');
    elInput.addEventListener('input', function(e) {
        _resetOptions(defaultOptions.options.filter(i =>
            i.text.toLowerCase().includes(e.target.value.toLowerCase())
        ));
    });

    elDroplistContainer.appendChild(elInput);
    elDroplistContainer.appendChild(elOptContainer);
    elContainer.appendChild(elDroplistContainer);
    el.parentElement.appendChild(elContainer);

    // Populate initial options
    Array.from(el.children).forEach(i => {
        defaultOptions.options.push({
            value: i.value,
            text: i.innerText
        });
    });

    let currentFocus = -1;

    // Render options to the DOM
    function _renderOptions(data) {
        const optFragments = document.createDocumentFragment();
        data.forEach(i => {
            const elOption = document.createElement('div');
            elOption.classList.add('selectz-option');
            elOption.textContent = i.text;
            elOption.dataset.value = i.value;
            optFragments.appendChild(elOption);
        });
        return optFragments;
    }

    // Reset and display options
    function _resetOptions(data) {
        elOptContainer.innerHTML = '';
        elOptContainer.appendChild(_renderOptions(data));
    }

    _resetOptions(defaultOptions.options);

    // Add active class to the focused option
    function _addActive(elements) {
        if (!elements) return false;
        _removeActive(elements);
        if (currentFocus >= elements.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = elements.length - 1;
        elements[currentFocus].classList.add('selectz-option-active');

        const option = elements[currentFocus];
        const containerRect = elOptContainer.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        // Scroll into view if necessary
        if (optionRect.bottom > containerRect.bottom) {
            elOptContainer.scrollTop = currentFocus * optionRect.height;
        } else if (optionRect.top < containerRect.top) {
            elOptContainer.scrollTop = currentFocus * optionRect.height;
        }
    }

    // Remove active class from all options
    function _removeActive(elements) {
        elements.forEach(el => el.classList.remove('selectz-option-active'));
    }

    // Toggle dropdown visibility and focus input on select click
    elSelect.addEventListener('click', function() {
        elDroplistContainer.classList.toggle('show');
        elInput.focus();
    });

    // Handle option click
    elOptContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('selectz-option')) {
            elSelect.textContent = e.target.textContent;
            elDroplistContainer.classList.remove('show');
            elInput.value = '';
            defaultOptions.onchange({ text: e.target.textContent, value: e.target.dataset.value });
            _resetOptions(defaultOptions.options);
        }
    });

    // Handle keyboard navigation
    elInput.addEventListener('keydown', function(e) {
        const options = elOptContainer.querySelectorAll('.selectz-option');
        if (e.key === 'ArrowDown') {
            currentFocus++;
            _addActive(options);
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            _addActive(options);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && options[currentFocus]) {
                options[currentFocus].click();
            }
        }
    });

    // Set the selected option programmatically
    function setSelectedOption(value) {
        const option = defaultOptions.options.find(opt => opt.value === value);
        if (option) {
            elSelect.textContent = option.text;
            defaultOptions.onchange({ text: option.text, value: option.value });
        } else {
            elSelect.textContent = '';
            defaultOptions.onchange(null);
        }
        elDroplistContainer.classList.remove('show');
        elInput.value = '';
        _resetOptions(defaultOptions.options);
    }

    // Clear all options
    function clearOptions() {
        defaultOptions.options = [];
        _resetOptions(defaultOptions.options);
    }

    // Public API
    return {
        options: defaultOptions.options,
        addOptions: function(arr, index) {
            if (!Array.isArray(arr)) throw new TypeError('First argument must be an array');
            if (index !== undefined && index !== null) {
                defaultOptions.options.splice(index, 0, ...arr);
            } else {
                defaultOptions.options.push(...arr);
            }
            _resetOptions(defaultOptions.options);
        },
        removeOption: function(value) {
            defaultOptions.options = defaultOptions.options.filter(i => i.value != value);
            _resetOptions(defaultOptions.options);
        },
        setSelectedOption,
        clearOptions
    }
}

export default Selectz;
