import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
                      name,
                      placeholder,
                      value,
                      error,
                      onChange,
                      disabled,
                      type = 'text',
                      icon
                    }) =>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        {icon}
      </span>
    </div>
    <input type={type}
           className={classnames('form-control form-control-lg', {'is-invalid': error})}
           placeholder={placeholder}
           name={name}
           value={value}
           onChange={onChange}
           disabled={disabled} />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>;

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputGroup;