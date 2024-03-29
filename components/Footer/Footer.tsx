import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFooterHeight } from '../../redux';

const Footer = () => {
	const router = useRouter();
	const footerRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setFooterHeight(footerRef?.current?.offsetHeight));
	});

	return (
		<>
			<div
				className="bg-[#1f203e] relative border border-r-0 border-l-0 border-b-0"
				ref={footerRef}
			>
				<div className="mx-auto text-white pt-10">
					<div className="text-center">
						<h1 className="text-4xl font-semibold">Download our app </h1>
						<p> Stay fit. All day, every day. </p>
						<div className="flex justify-center my-10">
							<div className="flex items-center border border-white rounded-lg px-4 py-2 w-52 mx-2 cursor-pointer">
								<img
									src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
									className="w-7 md:w-8"
								/>
								<div className="text-left ml-3">
									<p className="text-xs">Download on </p>
									<p className="text-sm md:text-base">Google Play Store</p>
								</div>
							</div>
							<div className="flex items-center border border-white rounded-lg px-4 py-2 w-44 mx-2 cursor-pointer">
								<img
									src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
									className="w-7 md:w-8"
								/>
								<div className="text-left ml-3">
									<p className="text-xs">Download on </p>
									<p className="text-sm md:text-base"> Apple Store </p>
								</div>
							</div>
						</div>
					</div>
					<div className="border border-r-0 border-l-0 border-b-0">
						<div className="container flex flex-col md:flex-row md:justify-between items-center text-white py-4">
							<p className="order-2 md:order-1 mt-8 md:mt-0">
								&copy; Mahadi Dev
							</p>
							<div className="order-1 md:order-2">
								<span className="px-2 cursor-pointer">About us</span>
								<span className="px-2 border-l cursor-pointer">Contact us</span>
								<span className="px-2 border-l cursor-pointer">
									Privacy Policy
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
