import React from 'react';

const ProvinceTransList = (props) => {
    return (
        <tbody>
            {props.provincesTrans.map((provinceTrans, index) => {
                return (
                    <tr key={provinceTrans.id} className={`row-${provinceTrans.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{provinceTrans.title == null ? '-': provinceTrans.title}</td>
                        <td>{provinceTrans.province.slug}</td>
                        <td>{provinceTrans.language.language}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditProvinceTrans.bind(null, provinceTrans.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( provinceTrans.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==provinceTrans.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteProvinceTrans.bind(null, provinceTrans.id)} href="# ">Yes</a> &nbsp;
                                    <a href="# " onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default ProvinceTransList;