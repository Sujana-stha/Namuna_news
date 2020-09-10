import React from 'react';
import Switch from 'react-switch';

const ProvincesList = (props) => {
    return (
        <tbody>
            {props.provinces.map((province, index) => {
                return (
                    <tr key={province.id} className={`row-${province.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{province.slug == null ? '-': province.slug}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditProvince.bind(null, province.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( province.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            
                            {props.confirmText==province.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteProvince.bind(null, province.id)} href="# ">Yes</a> &nbsp;
                                    <a href="# " onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        <td>
                            <div className="nm-switch">
                                {province.display_status == 1 ? (
                                    <Switch 
                                        onChange={() => props.provinceStatus(province)} 
                                        checked 
                                        className="react-switch"
                                    />
                                    ):
                                    <Switch 
                                        onChange={() => props.provinceStatus(province)} 
                                        checked ={props.isChecked}
                                        className="react-switch"
                                    />
                                }
                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default ProvincesList;