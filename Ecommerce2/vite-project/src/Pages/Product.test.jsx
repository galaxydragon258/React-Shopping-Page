import { it, expect, describe,vi } from 'vitest'
import { Product } from './Product'
import { render } from '@testing-library/react'

describe('Product Component', () => {
    it('Display the product details correctly', () => {
        const product = {

            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]

        }
        const loadCart = vi.fn();
        render(<Product product={product} loadCart={loadCart} />);
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();



    })
})