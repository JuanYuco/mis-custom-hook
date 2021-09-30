import { useEffect, useState, useRef } from "react"

export const useFetch = (url) => {
    const isMounted = useRef(true);
    const [state, setstate] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect( () => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect( () => {
        setstate({
            loading: true,
            data: null,
            error: null
        });

        fetch( url )
            .then( resp => resp.json() )
            .then( data =>{
                if ( isMounted.current ){
                    setstate({
                        loading: false,
                        error: null,
                        data
                    });
                } else{
                    console.log('Set State no se llamo');
                }
            }).catch(()=>{
                setstate({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });
            });
    }, [url]);

    return state;
}