'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'accessories', name: 'Accessories' },
  ]

  const products = [
    {
      id: 1,
      name: 'Mitch\'s Soccer Training Jersey',
      category: 'apparel',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&q=80',
      badge: 'Popular',
    },
    {
      id: 2,
      name: 'Official Soccer Ball',
      category: 'equipment',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80',
    },
    {
      id: 3,
      name: 'Training Shorts',
      category: 'apparel',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80',
    },
    {
      id: 4,
      name: 'Goalkeeper Gloves',
      category: 'equipment',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&q=80',
      badge: 'New',
    },
    {
      id: 5,
      name: 'Team Backpack',
      category: 'accessories',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    },
    {
      id: 6,
      name: 'Shin Guards',
      category: 'equipment',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    },
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80"
            alt="Soccer shop"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Shop
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Official merchandise and quality soccer equipment
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-gray-800 shadow-md">
        <div className="container-custom py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                    : 'bg-dark-800 text-gray-300 border border-gray-800 hover:bg-electric-purple-500/10 hover:border-electric-purple-500/30 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card group relative">
                {product.badge && (
                  <span className="badge badge-info absolute top-4 right-4 z-10">
                    {product.badge}
                  </span>
                )}

                {/* Product Image */}
                <div className="relative h-64 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Product Info */}
                <h3 className="font-display font-semibold text-xl text-white mb-2">
                  {product.name}
                </h3>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-4">
                  <span className="font-display font-bold text-2xl text-gradient-purple">
                    ${product.price}
                  </span>
                  <button className="btn btn-primary py-2 px-6 text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-900/50">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Bulk Orders & Team Kits
            </h2>
            <p className="text-gray-300 mb-8">
              Need equipment for your entire team? We offer special pricing for bulk orders and custom team kits.
            </p>
            <Link href="/contact" className="btn btn-outline">
              Contact Us for Team Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
