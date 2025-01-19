import { getCurrentSession } from '@/actions/auth';
import React from 'react';
import { getAllProducts } from '@/sanity/lib/client';
import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import ProductGrid from '@/components/product/ProdctGrid';
const Home = async () => {
  const products = await getAllProducts();
  const { user } = await getCurrentSession(); 
  return (
    <div>
      <SalesCampaignBanner />
      <section className='container mx-auto py-8 '>
        <ProductGrid products={products} /> 
      </section>
    </div>
  )
}

export default Home;
