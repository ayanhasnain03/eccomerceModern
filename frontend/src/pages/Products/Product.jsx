import { Link } from "react-router-dom"

const Product = ({product}) => {
  return (
    <div className="w-[30rem] ml-[2rem] relative">
        <div className="relative">
            <img src={product.image} alt={product.name}  className="w-[30rem] rounded"/>
        </div>
    </div>
  )
}

export default Product