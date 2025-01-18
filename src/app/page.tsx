import { getCurrentSession } from '@/actions/auth';
import React from 'react';
import { getAllProducts } from '@/sanity/lib/client';
const Home = async () => {
  const products = await getAllProducts();
  const { user } = await getCurrentSession(); 
  return (
    <div>
      Home
    </div>
  )
}

export default Home;
