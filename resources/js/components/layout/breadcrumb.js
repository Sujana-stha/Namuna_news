// Breadcrumb
import React from 'react'
import { Route, Link } from 'react-router-dom'

const BreadcrumbPageTitle = ({ match, ...rest }) => {
    return (
        <div className="col-sm-6">
            {match.isExact ? <h2 className="m-0 text-dark">{match.params.path.replace(/-/g, ' ')}</h2> : null}
            <Route path={`${match.url}/:path`} component={BreadcrumbPageTitle} />
        </div>
    )
}

const Breadcrumbs = () => {
    return (
        // <div className="breadcrumbs-wrapper container">
        //   <div className="page-title">
        //     <Route path='/:path' component={BreadcrumbPageTitle}/>
        //   </div>
        //   <ul className='container'>
        //       <Route path='/:path' component={BreadcrumbsItem} />
        //   </ul>
        // </div>
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <Route path='/:path' component={BreadcrumbPageTitle}/>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <Route path='/:path' component={BreadcrumbsItem} />
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
const BreadcrumbsItem = ({ match }) => (
    <span>
        <li className={match.isExact ? 'active breadcrumb-item' : 'breadcrumb-item first-item'}>
            <Link to={match.url || ''}>
                {match.params.path.replace(/-/g, ' ')}
            </Link>
        </li>
        <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </span>
)
export default Breadcrumbs;