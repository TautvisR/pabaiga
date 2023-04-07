import {router, useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


function Edit (props){
    const {data, setData, post}=useForm(props.restaurant);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post( route("restaurants.update", data.id),{
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
                        <label>Miestas</label>
                        <input className="form-control" type="text" id="city" onChange={handleChange} value={data.city}/>
                        <label>Adresas</label>
                        <input className="form-control" type="text" id="address" onChange={handleChange} value={data.address}/>
                        <label>Darbo laikas</label>
                        <input className="form-control" type="text" id="time" onChange={handleChange} value={data.time}/>
                        <button className="btn btn-success mt-2">Prideti</button>
                    </form>
                </div>

            </div>
        </AppLayout>
    )
}
export default Edit;
