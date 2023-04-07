import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


function Create (props){
    const {data, setData, post, errors}=useForm({
        name:'',
        city:'',
        address:'',
        time:''
    });
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        post( route("restaurants.store"));
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
                        <input className={"form-control "+(errors.name!=null?" is-invalid":"")}  type="text" id="name" onChange={handleChange} value={data.name} />
                        <div className={"invalid-feedback"}>{errors.name}</div>
                        <label>Miestas</label>
                        <input className={"form-control "+(errors.city!=null?" is-invalid":"")} type="text" id="city" onChange={handleChange} value={data.city}/>
                        <div className={"invalid-feedback"}>{errors.city}</div>
                        <label>Adresas</label>
                        <input className={"form-control "+(errors.address!=null?" is-invalid":"")} type="text" id="address" onChange={handleChange} value={data.address}/>
                        <div className={"invalid-feedback"}>{errors.address}</div>
                        <label>Darbo laikas</label>
                        <input className={"form-control "+(errors.time!=null?" is-invalid":"")}  type="text" id="time" onChange={handleChange} value={data.time}/>
                        <div className={"invalid-feedback"}>{errors.time}</div>
                        <button className="btn btn-success mt-2">Prideti</button>
                    </form>
                </div>

            </div>
        </AppLayout>
    )
}
export default Create;
