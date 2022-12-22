import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

BaseDropdownSelect.propTypes = {
    name: PropTypes.string.isRequired,
    fieldProps: PropTypes.object.isRequired,
    fieldMeta: PropTypes.object.isRequired,
    fieldHelpers: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,

    options: PropTypes.array,
    onValueChanged: PropTypes.func,

    additionContainerSelectClass: PropTypes.string,

    column: PropTypes.bool,
};

BaseDropdownSelect.defaultProps = {
    label: "",
    disabled: false,
    text: "",
    options: [],
    onValueChanged: null,
    additionContainerSelectClass: '',
    column: false,
};

function BaseDropdownSelect(props) {
    // MARK: --- Params ---
    const {
        fieldProps,
        fieldMeta,
        fieldHelpers,
        name,
        label,
        disabled,
        text,
        options,
        onValueChanged,
        additionContainerSelectClass,
        column
    } = props;
    const { error, touched } = fieldMeta;
    const showError = error && touched;
    const value = fieldProps.value;

    // MARK: --- Functions ---
    function handleOptionChanged(e) {
        const selectedValue = e.target.value;
        fieldHelpers.setValue(selectedValue);

        if (onValueChanged) {
            onValueChanged(selectedValue);
        }
    }

    return (
        <div className={`d-flex ${ column ? 'flex-column align-items-start' : 'align-items-center'}`}>
            {label && (<label className={`mr-4 mb-0 text-muted`}>{label}</label>)}
            <div className={`BaseDropdownSelect_${disabled ? 'Disabled border-0' : 'Group'} bg-white rounded  ${additionContainerSelectClass}`}>
                <select
                    id={name}
                    onChange={handleOptionChanged}
                    disabled={disabled}
                    className={`BaseDropdownSelect_Input bg-transparent rounded custom-select shadow-none ${showError ? 'is-invalid' : ''} border-0`}
                    style={{ color: `${disabled && '#4A5677'}`, fontWeight: `${disabled && '600'}`}}
                    value={value}
                >
                    {options.map((item, index) => {
                        return (
                            <option
                                key={index}
                                value={item.value}
                            // selected={item.value === value}
                            >
                                {item.text}
                            </option>
                        );
                    })}
                </select>

                {
                    showError && (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{error}</div>
                        </div>
                    )
                }
                {
                    text.length > 0 && (
                        <span className="form-text text-muted">{text}</span>
                    )
                }
            </div>
        </div>
    );
}

export default BaseDropdownSelect;