import React from 'react';

const LanguagesList = (props) => {
    return (
        <tbody>
            {props.languages.map((language, index) => {
                return (
                    <tr key={language.id} className={`row-${language.id}`}>
                        <td>{index}</td>
                        <td>{language.code == null ? '-': language.code}</td>
                        <td>{language.language}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditLanguage.bind(null, language.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( language.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            
                            {props.confirmText==language.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteLanguage.bind(null, language.id)} href="# ">Yes</a> &nbsp;
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

export default LanguagesList;