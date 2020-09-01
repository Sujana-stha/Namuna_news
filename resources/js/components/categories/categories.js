import React from 'react';
import Switch from 'react-switch';

const CategoriesList = (props) => {
    return (
        <tbody>
            {props.categories.map((category, index) => {
                return (
                    <tr key={category.id} className={`row-${category.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{category.slug == null ? '-': category.slug}</td>
                        <td>{category.parent =="No Parent" ? '-': category.parent}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditCategory.bind(null, category.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( category.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==category.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteCategory.bind(null, category.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                    <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        <td>
                            <div className="nm-switch">
                                    {category.display_status == 1 ? (
                                        <Switch 
                                        onChange={() => props.categoryStatus(category.id, category.display_status)} 
                                        checked 
                                        className="react-switch"
                                        />
                                    ):
                                        <Switch 
                                        onChange={() => props.categoryStatus(category.id, category.display_status)} 
                                        checked ={props.isChecked}
                                        className="react-switch"
                                        />
                                    }
                                    
                                    {/* {category.display_status== 1 ? (
                                        <input onClick={() => props.categoryStatus(category.id, category.display_status)} defaultChecked type="checkbox" className="custom-control-input" value={category.display_status} />

                                    ) :
                                    <input onClick={() => props.categoryStatus(category.id, category.display_status)}  type="checkbox" className="custom-control-input" value={category.display_status} />
                                    }
                                    Show */}
                                    {/* <span className="lever"></span> */}
                            
                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default CategoriesList;