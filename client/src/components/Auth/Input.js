import React from 'react'

export const Text = ({label, name, type = 'text', col, placeholder, value, style, children, onChange, onClick }) =>
    <div className="col form-group col-md" style={style}>
    <label>{label}</label>
    <input type={type} name={name} className="form-control" placeholder={placeholder} defaultValue={value} onBlur={onChange} onClick={onClick} onKeyUp={onClick} onFocus={onClick}  />
    {children}
</div>
export const Radio = ({ label, name, value, onChange}) => 
<label className="custom-control custom-radio custom-control-inline">
        <input className="custom-control-input" checked={label.toLowerCase() === value} type="radio" name={name} defaultValue={value} onChange={() => null} onBlur={(e) => onChange(e, label)} />
    <span className="custom-control-label">{label}</span>
</label>
export const Checkbox = ({ name, children, onChange }) => 
<label className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input"  name={name} onBlur={onChange} />
    <div className="custom-control-label">{ children }</div>
</label>
export const TextArea = ({ label, name, style, value, onChange}) =>
    <div className="form-group" style={style}>
        <label>{label}</label>
        <textarea className="form-control" rows="1" name={name} defaultValue={value} onChange={onChange}></textarea>
    </div>  
export const Select = ({ value, label, options, col, name, onChange, style}) => { 
    return (
        <div className={`form-group col-md-${col}`} style={ style}>
            <label>{label}</label>
            <select id={label} className="form-control" name={name} onChange={() => null} onBlur={onChange} defaultValue={value}>
                <option>Select...</option>
                {options.map((option, index) => <option key={index}>{ option}</option>)}   
            </select>
        </div>
    )
}
export const Email = props =>
<Text type="email" {...props} name="email">
   <small className="form-text text-muted">We'll never share your email with anyone else.</small>
</Text>
export const Password = props => <div className={`form-group col-md-${props.col}`}><Text name='password' type="password" {...props} onBlur={props.onChange}/></div>
export const ConfirmPassword = props => <div className={`form-group col-md-${props.col}`}><Text name='confirm_password' type="password" {...props} onBlur={props.onChange}/></div>
export const Submit = props => <button type="submit" className={`btn ${props.classNamees}`} disabled={props.disabled}>{props.title}</button>
