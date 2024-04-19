import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../Components/checkoutForm/CheckoutForm";
import { basekey } from "../../key";

const stripePromise = loadStripe(
	"pk_test_51KSNAVSHXH8pLHpJczu0rR4Eip7Q9WVtJNsVyC19lWmMtWFoE9yY9pFjk4cVWD2StvDqttn9zPqJd3wcU7fMXYPG00dGhRhXqb"
);

const Pay = () => {
	const [clientSecret, setClientSecret] = useState("");

	const { id } = useParams();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const { data } = await axios.post(
					`${basekey}/api/v1/orders/create-payment-intent/${id}`
				);
				setClientSecret(data?.clientSecret);
			} catch (err) {
				// console.log(err);
			}
		};
		makeRequest();
	}, []);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};
	return <div className="pay">
		{!clientSecret ? <h1>loading......</h1> : (
			<Elements options={options} stripe={stripePromise}>
				<CheckoutForm clientSecret={clientSecret} />
			</Elements>
		)}
	</div>;
};

export default Pay;
