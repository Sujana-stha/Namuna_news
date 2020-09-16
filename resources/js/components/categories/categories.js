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
                        <td>{category.parent =="None" ? '-': category.parent}</td>
                        
                        <td className="action">
                            <button type="button" onClick={props.onEditCategory.bind(null, category.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( category.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==category.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteCategory.bind(null, category.id)} href="# ">Yes</a> &nbsp;
                                    <a href="# " onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                        
                        <td>
                            <div className="nm-switch">
                                {category.display_status == 1 ? (
                                    <Switch 
                                        onChange={() => props.categoryStatus(category)} 
                                        checked 
                                        className="react-switch"
                                    />
                                    ):
                                    <Switch 
                                        onChange={() => props.categoryStatus(category)} 
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

export default CategoriesList;