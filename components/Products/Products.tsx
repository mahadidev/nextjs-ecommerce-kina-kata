import React, { useEffect, useState } from 'react';
import { FetchData } from '../../pages/api';
import { Button, Product } from '../index';

const Products = ({
	count,
	isMinimal,
}: {
	count: number;
	isMinimal?: boolean;
}) => {
	const [productCount, setProductCount] = useState(0);
	const [perLoading, setPerLoading] = useState(count);
	const [productsData, setProductsData] = useState(null);

	const getProduct = (data: any) => {
		setProductsData(data);
		if (data.length > 0) {
			const newProductData = data.slice(0, perLoading);
			// set product
			if (productsData) {
				setProductsData(productsData.concat(newProductData));
			} else {
				setProductsData(newProductData);
			}

			// set product count
			setProductCount(() => {
				if (data.length !== perLoading + 1) {
					return null;
				} else {
					return productCount + perLoading;
				}
			});
		}
	};

	const callProduct = (countStart: number) => {
		FetchData({
			name: 'product',
			countStart: countStart,
			countEnd: countStart + (perLoading + 1),
			callBack: getProduct,
		});
	};

	const loadMoreHandle = () => {
		callProduct(productCount);
	};

	useEffect(() => {
		callProduct(productCount);
	}, []);

	return (
		<div className="py-8">
			<div className="container m-auto">
				<h1 className="text-3xl text-black">All Product.</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center sm:justify-start gap-6 pt-4">
					{productsData?.map((product: any, i: number) => {
						return <Product key={i} product={product} isMinimal={isMinimal} />;
					})}
				</div>

				{productCount !== null && (
					<Button
						onClick={loadMoreHandle}
						className="mt-8 mx-auto"
						type="primary"
					>
						Load More
					</Button>
				)}
			</div>
		</div>
	);
};

export default Products;