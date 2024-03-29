import React, { useEffect, useState } from "react";
import Listedcard from "../components/Listedcard";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AccessDenied from "./AccessDenied";
import env from "../config";

const Favourites = () => {
  const { user, userFavourites } = useAuth();

  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getFavourites(){
      axios
        .get(`${env.BACKEND_URI}/api/v1/users/favourites`, {
          withCredentials: true,
        })
        .then((res) => {
          setProducts(res.data.data.products);
        })
        .catch((err) => {
        });
    }
    if(!userFavourites)
      getFavourites()
    else
      setProducts(userFavourites)
  }, []);
  return (
    <>
      {user ? (
        <div className="container mx-auto mt-8">
        {products && products.length > 0 ? 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(product => <Listedcard key={product._id} product={product} />)}
          </div>
          :
          <div className="grid place-items-center font-bold text-xl">You currently have no items marked as favourite</div>
        }
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Favourites;
