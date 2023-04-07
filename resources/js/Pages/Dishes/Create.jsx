import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


function Create (props){
    const {data, setData, post, errors}=useForm({
        name:'',
        price:'',
        picture:'',
        restaurant_id:''
    });
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        post( route("dishes.store"));
    }
    const restSele=[];
    restSele.push(<option key="0" value="">-</option> );
    props.restaurants.forEach((restaurant)=>{
        restSele.push(<option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option> )
    })

    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Nuajo kurimas
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="form-control">
                        <label>Pavadinimas</label>
                        <input className={"form-control "+(errors.name!=null?" is-invalid":"")}  type="text" id="name" onChange={handleChange} value={data.name} />
                        <div className={"invalid-feedback"}>{errors.name}</div>
                        <label>Kaina</label>
                        <input className={"form-control "+(errors.price!=null?" is-invalid":"")} type="text" id="price" onChange={handleChange} value={data.price}/>
                        <div className={"invalid-feedback"}>{errors.price}</div>
                        <label>Restoranas</label>
                        <select className={"form-control "+(errors.restaurant_id!=null?" is-invalid":"")}  id="restaurant_id" onChange={handleChange} value={data.restaurant_id}>
                            {restSele}
                        </select>
                        <div className={"invalid-feedback"}>{errors.restaurant_id}</div>
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
export default Create;
