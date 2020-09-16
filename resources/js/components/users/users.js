import React from 'react';

const UsersList = (props) => {
    return (
        <tbody>
            {props.users.map((user, index) => {
                return (
                    <tr key={user.id} className={`row-${user.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{user.name == null ? '-': user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.user_type}</td>
                        <td>{user.status}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditUser.bind(null, user.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( user.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==user.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteUser.bind(null, user.id)} href="# ">Yes</a> &nbsp;
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

export default UsersList;