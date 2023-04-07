import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){

    const edit=props.can.edit;
    const [filter, setFilter]=useState({
        name:props.filter.name
    });
    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        });
    }
    const handleFilter=()=>{
        router.post(route("restaurants.filter"),filter);
    }
    const handleDelete=(event)=>{
        router.delete( route("restaurants.destroy", event.target.value) );
    }
    const restList=[];
    props.restaurants.forEach((restaurant)=>{
        restList.push(
            <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.time}</td>
                <td>
                    {edit && <Link className="btn btn-primary" href={ route('restaurants.edit', restaurant.id)}>Redaguoti</Link>}
                    {edit &&<button onClick={handleDelete} value={restaurant.id} className="btn btn-danger">Trinti</button>}

                </td>
            </tr>
        )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Restoranai
                    {edit && <Link href={ route("restaurants.create")} className="btn btn-info float-end">Prideti restorana</Link>}

                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                                <label>Pgal varda</label>
                                <input onChange={handleChange} id="name" value={filter.name} type="text" className="form-control"/>
                            </th>
                            <th>
                                <button onClick={handleFilter} className="btn btn-warning">Ieskoti</button>
                            </th>
                        </tr>
                        <tr>
                            <th>Pavadinimas</th>
                            <th>Miestas</th>
                            <th>Adresas</th>
                            <th>Darbo laikas</th>
                            {edit &&<th>Veiksmai</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {restList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )

}
