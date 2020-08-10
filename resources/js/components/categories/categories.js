import React from 'react';

const CategoriesList = (props) => {
    return (
        <tbody>
            {props.categories.map((category, index) => {
                return (
                    <tr key={category.id} className={`row-${category.id}`}>
                        <td>{index}</td>
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
                            <div className="switch">
                                <label>
                                    {category.display_status== 1 ? (
                                        <input onClick={() => props.categoryStatus(category.id, category.display_status)} defaultChecked type="checkbox" value={category.display_status} />

                                    ) :
                                        <input onClick={() => props.categoryStatus(category.id, category.display_status)} type="checkbox" value={category.display_status} />
                                    }
                                    <span className="lever"></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default CategoriesList;