import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";

export default function AppLayout ({children}){
    const {auth, pavadinimas}=usePage().props;
    const user=auth.user;

    return(
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="../../../../penkt/resources/js/Layouts#">Navbar</a>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link"  href={ route("restaurants.index")} >Restoranai</Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"  href={ route("dishes.index")} >Patiekalai</Link>

                            </li>
                        </ul>
                        {user==null ?
                                <div className="float-end">
                                    <Link className="btn btn-primary mr-3 "  href={ route("login")} >Prisijungti</Link>
                                    &nbsp;
                                    <Link className="btn btn-info "  href={ route("register")} >Registruotis</Link>
                                </div>
                                :
                                <div className="float-end">
                                    <span >Jūs esate prisijungęs kaip: <b>{user.name} ({user.type==1?"administratorius":"vartotojas"})</b> </span>
                                    <Link className="btn btn-warning " href={route('logout')} method="post" >Atsijungti</Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
            <div>
                {children}
            </div>
        </div>
    );
}
