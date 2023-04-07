import {router, useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


function Edit (props){
    const {data, setData, post}=useForm(props.dish);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }
    const restSele=[];
    restSele.push(<option key="0" value="">-</option> );
    props.restaurants.forEach((restaurant)=>{
        restSele.push(<option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option> )
    })
    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post( route("dishes.update", data.id),{
            ...data,
            _method:'put',
    });
    }

    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Nuajo kurimas
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="form-control">
                        <label>Pavadinimas</label>
                        <input className="form-control" type="text" id="name" onChange={handleChange} value={data.name} />
                        <label>Kaina</label>
                        <input className="form-control" type="text" id="price" onChange={handleChange} value={data.price}/>
                        <label>Kategorija</label>
                        <select className="form-control" id="restaurant_id" onChange={handleChange} value={data.restaurant_id}>
                            {restSele}
                        </select>
                        <label>Paveiksliukas</label>
                        <input className="form-control" type="file" id="picture" onChange={(event)=>{
                            setData({
                                ...data,
                                picture: event.target.files[0]
                            })}
                        } />
                        <button className="btn btn-success mt-2">Prideti</button>
                    </form>
                </div>

            </div>
        </AppLayout>
    )
}
export default Edit;
