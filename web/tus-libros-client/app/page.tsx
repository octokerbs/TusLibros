"use client";

import { useState } from 'react';

interface CreateCartRequest {
  clientId: string;
  password: string;
}

interface CreateCartResponse {
  cartId: number; 
}

export default function Home() {
  const [response, setResponse] = useState<CreateCartResponse | null>(null);

  const handleCreateCart = async () => {
    const requestBody: CreateCartRequest = {
      clientId: 'Octo',
      password: 'Kerbs',
    };

    try {
      const res = await fetch('http://localhost:8080/CreateCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }

      const data: CreateCartResponse = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse(null);
    }
  };

  return (
    <div>
      <button onClick={handleCreateCart}>Create Cart</button>
      {response && (
        <p>Response: Cart ID is {response.cartId}</p>
      )}
    </div>
  );
}

