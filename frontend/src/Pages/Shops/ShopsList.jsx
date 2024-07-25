import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setShops } from '../../Service/api/redux/reducers/shopSlices/shopSlices';

const ShopsList = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shop.shops);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/shops/all');
      if (response.data && Array.isArray(response.data.result)) {
        dispatch(setShops(response.data.result));
      } else {
        console.error("Received data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
      setShowList(true); // Show the list after fetching the shops
    }
  };

  const toggleShowList = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  return (
    <div>
      <h3>Shops List</h3>
      <button onClick={loading ? null : showList ? toggleShowList : fetchShops}>
        {loading ? 'Loading...' : showList ? 'Hide Shops' : 'Show All Shops'}
      </button>
      {showList && (
        <>
          {Array.isArray(shops) && shops.length > 0 ? (
            <ul>
              {shops.map((shop) => (
                <li key={shop.id}>
                  <h4>{shop.shopname}</h4>
                  <p>Country: {shop.country}</p>
                  <p>Phone: {shop.phone_number}</p>
                  <p>Email: {shop.email}</p>
                  <p>Category ID: {shop.category_id}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No shops available or data is not valid.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShopsList;