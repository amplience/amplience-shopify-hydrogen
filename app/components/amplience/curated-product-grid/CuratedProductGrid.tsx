import React, {useEffect, useState} from 'react'

type CuratedProductListProps = {
    title: string;
    products: any[];
}

const CuratedProductList: React.FC<CuratedProductListProps>  = ({title, products}) => {
    const [apiProducts, setApiProducts] = useState([])

    useEffect(() => {
        
    }, [products])

    return (
        <div>
            {JSON.stringify(products)}
        </div>
    )
}

export default CuratedProductList
