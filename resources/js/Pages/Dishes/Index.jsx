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
        router.post(route("dishes.filter"),filter);
    }
    const handleDelete=(event)=>{
        router.delete( route("dishes.destroy", event.target.value) );
    }
    const order=props.order;
    const dishList=[];
    props.dishes.forEach((dish)=>{
        dishList.push(
            <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>{dish.price} EUR</td>
                <td>
                    {dish.picture && <img alt="foto" width="200px"  src={"/storage/dishes/"+dish.picture} />}

                </td>
                <td>{dish.restaurant.name}</td>
                <td>
                    {edit && <Link className="btn btn-primary" href={ route('dishes.edit', dish.id)}>Redaguoti</Link>}
                    {edit && <button onClick={handleDelete} value={dish.id} className="btn btn-danger">Trinti</button>}

                </td>
            </tr>
        )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Patiekalai
                    {edit &&<Link href={ route("dishes.create")} className="btn btn-info float-end">Prideti patiekala</Link>}

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
                            <th><Link href={route("dishes.order", ["price", order.field=="price" && order.dir=="ASC"?"DESC":"ASC"])}>Kaina{order.dir=="ASC"?" nup pigiausiu":" kaina nuo brangiausiu"}</Link></th>
                            <th>Nuotrauka</th>
                            <th>Restoranas</th>
                            {edit &&<th>Veiksmai</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {dishList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )

}
